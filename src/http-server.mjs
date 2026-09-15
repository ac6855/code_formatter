/**
 * HTTP 服务：路由 /api/health 与 /api/format，其余交给静态文件服务。
 */
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { backendStatus, format, isReady, loadBackend } from './backend.mjs';
import { HOST, MAX_BODY_BYTES } from './config.mjs';
import { createStaticHandler } from './static.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(HERE, '..', 'public');
const SHARED_DIR = path.resolve(HERE, '..', 'shared');

/**
 * 静态资源根目录挂载表，按声明顺序匹配前缀。
 * shared/ 单独挂载，是为了让浏览器能 import 语言注册表，
 * 又不用把整个服务端源码目录暴露出去。
 */
const handleStatic = createStaticHandler([
  { prefix: '/shared/', dir: SHARED_DIR },
  { prefix: '/', dir: PUBLIC_DIR },
]);

function sendJson(res, status, payload) {
  const body = Buffer.from(JSON.stringify(payload), 'utf8');
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': String(body.length),
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

/** 读取请求体，超过上限则中断请求。 */
function readBody(req, limit = MAX_BODY_BYTES) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) {
        reject(new Error('请求体过大'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

/**
 * 拆出不含查询串的路径并解码。
 * decodeURIComponent 遇到畸形编码（如 %zz）会抛错，这里转成 400 而不是让外层兜成 500。
 */
function parsePath(rawUrl) {
  const withoutQuery = (rawUrl || '/').split('?')[0];
  try {
    return { ok: true, path: decodeURIComponent(withoutQuery) };
  } catch {
    return { ok: false };
  }
}

async function handleHealth(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendJson(res, 405, { ok: false, error: '仅支持 GET' });
    return;
  }
  const status = backendStatus();
  sendJson(res, 200, {
    ok: true,
    backendReady: status.ready,
    engines: status.engines,
    // 未就绪时把原因一并给出，前端不必再猜
    error: status.error || undefined,
  });
}

async function handleFormat(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, error: '仅支持 POST' });
    return;
  }

  let raw;
  try {
    raw = await readBody(req);
  } catch (e) {
    sendJson(res, 413, { ok: false, error: e.message });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    sendJson(res, 400, { ok: false, error: '请求体不是合法 JSON' });
    return;
  }

  if (!isReady()) {
    sendJson(res, 503, { ok: false, error: backendStatus().error || '后端引擎尚未就绪' });
    return;
  }

  try {
    const data = await format({
      lang: payload.lang,
      code: payload.code,
      action: payload.action || 'format',
      tabWidth: payload.tabWidth || 2,
      useTabs: Boolean(payload.useTabs),
    });
    sendJson(res, 200, data);
  } catch (e) {
    sendJson(res, 500, {
      ok: false,
      error: '格式化处理异常：' + (e && e.message ? e.message : e),
    });
  }
}

async function handleRequest(req, res) {
  const parsed = parsePath(req.url);
  if (!parsed.ok) {
    sendJson(res, 400, { ok: false, error: '请求路径不是合法的 URL 编码' });
    return;
  }
  const urlPath = parsed.path;

  try {
    if (urlPath === '/api/health') return await handleHealth(req, res);
    if (urlPath === '/api/format') return await handleFormat(req, res);
    await handleStatic(req, res, urlPath);
  } catch (e) {
    if (res.headersSent) {
      res.destroy();
      return;
    }
    sendJson(res, 500, { ok: false, error: '服务器内部错误' });
    console.error('[http] 未捕获的请求异常:', e);
  }
}

/** 创建（尚未监听的）HTTP 服务，便于测试时绑定随机端口。 */
export function createServer() {
  return http.createServer(handleRequest);
}

/**
 * 启动服务并加载后端引擎。
 * 端口被占用等情况会 reject，交给调用方给出可读提示——重构前这里没有 error 监听，
 * EADDRINUSE 会让 Promise 永远不 resolve，进程静默挂住。
 * @param {number} port
 * @returns {Promise<{server: import('node:http').Server, port: number}>}
 */
export async function startServer(port) {
  await loadBackend();

  const server = createServer();
  const boundPort = await new Promise((resolve, reject) => {
    const onError = (e) => reject(e);
    server.once('error', onError);
    server.listen(port, HOST, () => {
      server.removeListener('error', onError);
      resolve(server.address().port);
    });
  });

  return { server, port: boundPort };
}

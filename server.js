// 静态文件服务器 + 后端格式化 API（零第三方运行时依赖，仅用 Node 内置模块）
// 同时被 Electron 主进程（main.js）与独立「node server.js」（轻量跨平台方案）复用。
// 格式化计算由 format-backend.mjs 在 Node 进程内完成，前端通过 /api/format 调用，
// 浏览器不再需要下载庞大的前端 wasm 引擎，加载更快。
const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

// 后端格式化引擎（ESM 模块，需动态 import）
let backend = null;
let backendReady = false; // 引擎是否完成初始化（供 /api/health 健康检查）
async function loadBackend() {
  try {
    backend = await import('./format-backend.mjs');
    await backend.initEngines();
    backendReady = true;
    console.log('[backend] 格式化引擎已初始化');
  } catch (e) {
    backendReady = false;
    console.error('[backend] 引擎初始化失败：', e && e.message ? e.message : e);
  }
}

// 读取请求体（带大小上限，防止异常大请求）
function readBody(req, limit = 8 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) { reject(new Error('请求体过大')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

// 启动静态服务器，托管 rootDir 目录；返回 { server, port }
function startServer(rootDir, port) {
  const server = http.createServer(async (req, res) => {
    try {
      const urlPath0 = (req.url || '/').split('?')[0];

      // —— 健康检查 API（前端启动探测真实后端/引擎状态，替代写死的“已连接”）——
      if (req.method === 'GET' && urlPath0 === '/api/health') {
        const engines = (backend && backend.getEngineStatus) ? backend.getEngineStatus() : { ready: false };
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: true, backendReady, engines }));
        return;
      }

      // —— 后端格式化 API ——
      if (req.method === 'POST' && urlPath0 === '/api/format') {
        let body;
        try { body = await readBody(req); }
        catch (e) { res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify({ ok: false, error: e.message })); return; }
        let payload;
        try { payload = JSON.parse(body); }
        catch { res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify({ ok: false, error: '请求体不是合法 JSON' })); return; }
        if (!backend) { res.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify({ ok: false, error: '后端引擎尚未就绪' })); return; }
        try {
          const data = await backend.format({
            lang: payload.lang,
            code: payload.code,
            action: payload.action || 'format',
            tabWidth: payload.tabWidth || 2,
            useTabs: !!payload.useTabs,
          });
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify(data));
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ ok: false, error: '格式化处理异常：' + (e && e.message ? e.message : e) }));
        }
        return;
      }

      // —— 静态文件 ——
      let urlPath = decodeURIComponent(urlPath0);
      if (urlPath === '/') urlPath = '/index.html';

      // 防目录穿越：解析后必须仍落在 rootDir 内
      const safePath = path.normalize(path.join(rootDir, urlPath));
      if (safePath !== rootDir && !safePath.startsWith(rootDir + path.sep)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 Forbidden');
        return;
      }

      fs.stat(safePath, (err, stat) => {
        if (err || !stat.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 Not Found');
          return;
        }
        const ext = path.extname(safePath).toLowerCase();
        res.writeHead(200, {
          'Content-Type': MIME[ext] || 'application/octet-stream',
          'Cache-Control': 'no-cache',
        });
        fs.createReadStream(safePath).pipe(res);
      });
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: '服务器内部错误' }));
    }
  });

  return new Promise((resolve) => {
    // 监听 0.0.0.0：本机 localhost 仍可访问，且支持局域网 / 容器 / 反向代理场景
    server.listen(port, '0.0.0.0', () => {
      const addr = server.address();
      resolve({ server, port: addr.port });
    });
  });
}

// 直接运行：node server.js  [port]
if (require.main === module) {
  const dir = __dirname;
  const port = parseInt(process.env.PORT || '4317', 10);
  loadBackend()
    .then(() => startServer(dir, port))
    .then(({ port: p }) => {
      console.log(`代码格式化器已启动 ->  http://localhost:${p}  (监听 0.0.0.0，局域网 / 容器可访问)`);
      console.log('按 Ctrl+C 停止');
    });
}

module.exports = { startServer, loadBackend };

/**
 * 静态文件服务。
 *
 * 与重构前的差异（都是为了让「首次打开页面快」这个项目立意真正落地）：
 *   1. 支持多根目录挂载：public/ 挂在 /，shared/ 挂在 /shared/，
 *      这样前端能直接 import 共享的语言注册表，而不必把服务端代码整目录暴露出去。
 *   2. 支持 ETag + If-None-Match：Monaco 有 12MB 资源，重载页面时命中 304 几乎不传数据。
 *   3. 支持 gzip：文本资源（含 3.7MB 的 editor.main.js）可压到约 1/4，
 *      压缩结果按 ETag 缓存复用，不会每次请求都重新压。
 *   4. 支持 HEAD、非 GET/HEAD 返回 405、畸形 URI 返回 400（原来是 500）。
 *
 * 注意 ETag 里带了编码标记（-gz）：同一个文件在 gzip 与未压缩两种表示下
 * ETag 必须不同，否则会让缓存把两者认成同一份资源。
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';
import { promisify } from 'node:util';

const gzip = promisify(zlib.gzip);

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

/** 值得压缩的类型。wasm 本身已是二进制压缩格式，不再二次压缩。 */
const COMPRESSIBLE = /^text\/|^application\/(javascript|json)|^image\/svg/;

/** 小于该体积的文件不值得压缩（压完可能更大，还要多一层解压开销）。 */
const GZIP_MIN_BYTES = 1024;

/** 压缩缓存上限。页面实际只会请求 Monaco 的一部分文件，512 条足够覆盖。 */
const GZIP_CACHE_MAX = 512;

/** key 为 "文件绝对路径:etag"，value 为压缩后的 Buffer。 */
const gzipCache = new Map();

async function gzipCached(cacheKey, buf) {
  const hit = gzipCache.get(cacheKey);
  if (hit) return hit;

  const packed = await gzip(buf);
  // 简单的容量控制：超限就清空，避免无限增长（命中率无关紧要，重建成本很低）
  if (gzipCache.size >= GZIP_CACHE_MAX) gzipCache.clear();
  gzipCache.set(cacheKey, packed);
  return packed;
}

/**
 * 把 URL 路径解析到某个根目录下的真实文件。
 * @returns {{filePath: string, root: string} | null} 越界或根目录不匹配时返回 null
 */
function resolveFile(urlPath, roots) {
  for (const { prefix, dir } of roots) {
    if (!urlPath.startsWith(prefix)) continue;

    let rel = urlPath.slice(prefix.length);
    if (rel === '' || rel.endsWith('/')) rel += 'index.html';

    // 防目录穿越：规范化之后必须仍然落在该根目录内
    const filePath = path.resolve(dir, rel);
    if (filePath !== dir && !filePath.startsWith(dir + path.sep)) return null;

    return { filePath, root: dir };
  }
  return null;
}

function makeEtag(stat, encoded) {
  return `"${stat.size.toString(16)}-${stat.mtimeMs.toString(16)}${encoded ? '-gz' : ''}"`;
}

/**
 * 生成静态请求处理函数。
 * @param {Array<{prefix: string, dir: string}>} roots 根目录挂载表，按顺序匹配
 * @returns {(req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, urlPath: string) => Promise<boolean>}
 *          返回 true 表示请求已被处理
 */
export function createStaticHandler(roots) {
  return async function handleStatic(req, res, urlPath) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', Allow: 'GET, HEAD' });
      res.end('405 Method Not Allowed');
      return true;
    }

    const resolved = resolveFile(urlPath, roots);
    if (!resolved) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return true;
    }

    let stat;
    try {
      stat = await fs.stat(resolved.filePath);
    } catch {
      stat = null;
    }
    if (!stat || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return true;
    }

    const contentType = MIME[path.extname(resolved.filePath).toLowerCase()] || 'application/octet-stream';
    const acceptsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '');
    const wantGzip = acceptsGzip && COMPRESSIBLE.test(contentType) && stat.size >= GZIP_MIN_BYTES;
    const etag = makeEtag(stat, wantGzip);

    const headers = {
      'Content-Type': contentType,
      // no-cache 意为「可缓存但每次必须回源校验」，配合 ETag 就是廉价的 304
      'Cache-Control': 'no-cache',
      ETag: etag,
      Vary: 'Accept-Encoding',
    };

    // 若客户端已持有同一份表示，直接 304，不读文件、不压缩
    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, headers);
      res.end();
      return true;
    }

    let body = await fs.readFile(resolved.filePath);
    if (wantGzip) {
      body = await gzipCached(`${resolved.filePath}:${etag}`, body);
      headers['Content-Encoding'] = 'gzip';
    }
    headers['Content-Length'] = String(body.length);

    res.writeHead(200, headers);
    if (req.method === 'HEAD') res.end();
    else res.end(body);
    return true;
  };
}

// 纯 Node 静态文件服务器（零第三方依赖）
// 同时被 Electron 主进程（main.js）与独立「node server.js」（轻量跨平台方案）复用
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

// 启动静态服务器，托管 rootDir 目录；返回 { server, port }
function startServer(rootDir, port) {
  const server = http.createServer((req, res) => {
    try {
      let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
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
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 Server Error');
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
  startServer(dir, port).then(({ port: p }) => {
    console.log(`代码格式化器已启动 ->  http://localhost:${p}  (监听 0.0.0.0，局域网 / 容器可访问)`);
    console.log('按 Ctrl+C 停止');
  });
}

module.exports = { startServer };

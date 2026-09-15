#!/usr/bin/env node
/**
 * 入口：启动 HTTP 服务并加载格式化引擎。
 *
 * 用法：
 *   node server.js              # 监听 4317
 *   PORT=8080 node server.js    # 指定端口
 */
import { backendStatus } from './src/backend.mjs';
import { DEFAULT_PORT, HOST } from './src/config.mjs';
import { startServer } from './src/http-server.mjs';

async function main() {
  const rawPort = process.env.PORT ?? String(DEFAULT_PORT);
  const port = Number.parseInt(rawPort, 10);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    console.error(`[启动失败] PORT 不是合法端口号: ${rawPort}`);
    process.exit(1);
  }

  let handle;
  try {
    handle = await startServer(port);
  } catch (e) {
    if (e && e.code === 'EADDRINUSE') {
      console.error(`[启动失败] 端口 ${port} 已被占用，换一个端口：PORT=8080 node server.js`);
    } else {
      console.error('[启动失败]', e && e.message ? e.message : e);
    }
    process.exit(1);
  }

  const status = backendStatus();
  if (status.ready) {
    const engines = status.engines;
    const missing = [];
    if (!engines.clang) missing.push('clang-format');
    if (!engines.gofmt) missing.push('gofmt');
    console.log(
      missing.length
        ? `[backend] 格式化引擎已初始化，但以下引擎不可用：${missing.join(' / ')}`
        : '[backend] 格式化引擎已初始化',
    );
  } else {
    // 依赖缺失时服务照常提供页面，只是 /api/format 会返回 503
    console.error('[backend] 格式化引擎加载失败：', status.error);
    console.error('[backend] 页面仍可访问，但格式化接口将返回 503');
  }

  console.log(`代码格式化器已启动 ->  http://localhost:${handle.port}  (监听 ${HOST}，局域网 / 容器可访问)`);
  console.log('按 Ctrl+C 停止');

  const shutdown = (signal) => {
    console.log(`\n收到 ${signal}，正在关闭…`);
    handle.server.close(() => process.exit(0));
    // 兜底：连接迟迟不释放时强制退出
    setTimeout(() => process.exit(0), 3000).unref();
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main();

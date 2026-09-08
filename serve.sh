#!/usr/bin/env bash
# 纯前端代码格式化器 —— 本地静态服务器（无需 Docker / 无需联网）
# 用法：在终端运行  ./serve.sh       然后浏览器打开 http://localhost:8080
#       指定端口：./serve.sh 9000
cd "$(dirname "$0")" || exit 1
PORT="${1:-8080}"
echo "代码格式化器已启动 ->  http://localhost:${PORT}"
echo "按 Ctrl+C 停止"
exec python3 -m http.server "${PORT}"

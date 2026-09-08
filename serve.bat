@echo off
REM 纯前端代码格式化器 —— 本地静态服务器（无需 Docker / 无需联网）
cd /d "%~dp0"
set PORT=8080
if not "%~1"=="" set PORT=%~1
echo 代码格式化器已启动 -> http://localhost:%PORT%
echo 按 Ctrl+C 停止
py -m http.server %PORT%

# 代码格式化器 —— 网页服务镜像（前端 Monaco 编辑器 + 后端 Node 格式化引擎）
# 前端只下发编辑器，格式化计算在容器内 Node 进程完成（经 /api/format），
# 因此浏览器不再需要下载庞大的前端 wasm 引擎，加载更快。
# 用法：
#   docker build -t code-formatter .
#   docker run -d --name code-formatter -p 4317:4317 code-formatter
# 改端口：docker run -e PORT=8080 -p 8080:8080 code-formatter

FROM node:20-alpine

WORKDIR /app

# 先装后端引擎依赖（利用层缓存：依赖不变时无需重装）
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

# 复制应用代码（含前端静态资源与 vendor/wasm 引擎文件）
COPY . .

EXPOSE 4317

# server.js 读取 process.env.PORT 作为监听端口（默认 4317）
ENV PORT=4317

CMD ["node", "server.js"]

# 纯前端代码格式化器 —— 网页服务镜像
# 本质：静态文件 + 纯 Node 静态服务器（server.js 零三方依赖，无需 npm install）
# 用法：
#   docker build -t code-formatter .
#   docker run -d --name code-formatter -p 4317:4317 code-formatter
# 改端口：docker run -e PORT=8080 -p 8080:8080 code-formatter

FROM node:20-alpine

WORKDIR /app

# 仅复制静态资源与 Node 服务器；项目无构建步骤、无第三方依赖
COPY app.js index.html style.css server.js ./
COPY vs ./vs
COPY vendor ./vendor

EXPOSE 4317

# server.js 读取 process.env.PORT 作为监听端口（默认 4317）
ENV PORT=4317

CMD ["node", "server.js"]

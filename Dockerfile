# 代码格式化器 —— 网页服务镜像（前端 Monaco 编辑器 + 后端 Node 格式化引擎）
# 前端只下发 Monaco 编辑器，格式化计算在容器内 Node 进程完成（经 /api/format），
# 因此浏览器不需要下载庞大的引擎资源，加载更快。
#
# 用法：
#   docker build -t code-formatter .
#   docker run -d --name code-formatter -p 4317:4317 code-formatter
# 改端口：docker run -e PORT=8080 -p 8080:8080 code-formatter

FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app

# 先只拷贝依赖清单：依赖没变时这一层能命中缓存，改代码不会触发重装依赖。
# 用 npm ci 而非 npm install —— 前者严格按 package-lock.json 安装，
# 保证不同时间、不同机器构建出的镜像里引擎版本完全一致
# （prettier 的格式化结果会随版本变化，锁不住版本就会出现「同样的代码在
#  本地和 NAS 上格式化结果不同」这种难查的问题）。
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# 只拷贝运行必需的内容。显式列出而非 COPY . .，
# 避免把测试、CI 配置、文档等一并打进镜像。
COPY server.js ./
COPY src ./src
COPY shared ./shared
COPY public ./public
COPY vendor ./vendor

EXPOSE 4317

# server.js 读取 process.env.PORT 作为监听端口（默认 4317）
ENV PORT=4317

# 用 Node 内置 fetch 探健康检查，镜像里不必额外装 curl / wget。
# backendReady 为 true 才算健康——只检查端口通会漏掉「依赖缺失导致引擎加载失败」的情况。
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4317)+'/api/health').then(r=>r.json()).then(d=>process.exit(d.backendReady?0:1)).catch(()=>process.exit(1))"

# 应用不需要任何写权限，降权运行；容器被攻破时影响面更小
USER node

CMD ["node", "server.js"]

# code_formatter（代码格式化器）

纯前端界面的代码格式化工具，**格式化计算运行在后端（Node）**，浏览器只加载 Monaco 编辑器并通过 `/api/format` 接口调用引擎。因此首次打开页面不再需要下载庞大的前端 wasm/JS 引擎，网速较差时加载也很快。

## 支持的语言

| 类别 | 语言 |
|------|------|
| Prettier | JavaScript · TypeScript · JSON · YAML · HTML · CSS · SCSS · LESS · Markdown |
| SQL | SQL（支持格式化 / 压缩） |
| XML | XML（支持格式化 / 压缩） |
| clang-format | C · C++ · Java · C# · Objective-C · Protocol Buffers · Verilog |
| gofmt | Go |
| ruff | Python（格式化；缩进随前端选择，Tab 时切 tab 缩进） |
| shfmt | Bash / Shell（bash 方言） |
| JS 压缩 | JavaScript（terser） |

> 暂未接入（前端会直接提示）：PHP（需 `@prettier/plugin-php`）。后续可在容器内接入对应引擎。

## 架构

```
浏览器 (Monaco 编辑器)
   │  POST /api/format  { lang, code, action, tabWidth, useTabs }
   ▼
Node 服务 (server.js + format-backend.mjs)
   ├─ prettier / sql-formatter / terser / xml-formatter   (npm 包)
   ├─ clang-format / gofmt                               (复用 vendor/wasm，Node 端加载)
   ├─ ruff            (@astral-sh/ruff-wasm-nodejs，纯 wasm)
   └─ shfmt           (@wasm-fmt/shfmt，纯 wasm)
   │  返回 { ok, result } 或 { ok:false, error, line, col }
   ▼
浏览器回填输出区，并按 line/col 高亮错误行
```

## 部署

### Docker（推荐：飞牛 FnOS / 群晖 / 裸 docker compose）

镜像已通过 GitHub Actions 自动构建并推送到 GHCR：

```
ghcr.io/ac6855/code-formatter:latest
```

**飞牛 FnOS**：在 Docker 应用中新建「项目」，粘贴 `docker-compose.yml` 内容后创建即可（该 compose 已写好从 GHCR 拉取镜像）。

**裸 docker**：

```bash
docker run -d --name code-formatter -p 4317:4317 ghcr.io/ac6855/code-formatter:latest
# 改端口：
docker run -d --name code-formatter -e PORT=8080 -p 8080:8080 ghcr.io/ac6855/code-formatter:latest
```

> 若 NAS 拉取 `ghcr.io` 慢或超时，可在飞牛 Docker 设置里添加 GitHub 容器镜像加速（如 `ghcr.nju.edu.cn`），或把 compose 中镜像改为 `ghcr.nju.edu.cn/ac6855/code-formatter:latest`。
> 镜像需为**公开**才能免登录拉取；若拉取报 401，去 GitHub → Packages → code-formatter → 设为 Public。

### QNAP（watchcow）

使用 `docker-compose.watchcow.yml`，按要求放置图标 `/vol2/1000/Data/icons/code-formatter.png` 后在 watchcow 导入即可。

## 本地开发 / 自托管构建

```bash
npm install            # 安装后端引擎依赖（prettier / ruff / shfmt 等）
npm run server         # 启动 node server.js，访问 http://localhost:4317
```

自行构建镜像：

```bash
docker build -t code-formatter .
docker run -d -p 4317:4317 code-formatter
```

## 目录结构

```
app.js              前端逻辑（编辑器 + 调用 /api/format）
index.html          页面
style.css           样式
server.js           Node 静态服务 + /api/format
format-backend.mjs  后端格式化引擎（prettier/sql/terser/xml + clang/gofmt/ruff/shfmt）
vendor/wasm/        复用的 clang-format / gofmt wasm 引擎（Node 端加载）
vs/                 Monaco 编辑器
```

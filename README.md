# code_formatter（代码格式化器）

浏览器里只加载 Monaco 编辑器，**格式化计算在容器内的 Node 进程完成**，前端通过 `/api/format` 调用引擎。因此首次打开页面不需要下载庞大的 wasm/JS 引擎，网速较差时加载也很快；代码也不会离开你的网络。

## 支持的语言

| 类别          | 语言                              | 引擎          | 压缩      |
| ------------- | --------------------------------- | ------------- | --------- |
| 前端 / Web    | JavaScript                        | Prettier      | ✅ terser |
| 前端 / Web    | TypeScript                        | Prettier      | —         |
| 前端 / Web    | HTML · CSS · SCSS · LESS          | Prettier      | —         |
| 前端 / Web    | JSON                              | Prettier      | ✅        |
| 前端 / Web    | YAML · Markdown                   | Prettier      | —         |
| 数据 / 查询   | SQL                               | sql-formatter | ✅        |
| 数据 / 查询   | XML                               | xml-formatter | ✅        |
| 系统 / 编译型 | C · C++ · C# · Java · Objective-C | clang-format  | —         |
| 系统 / 编译型 | Go                                | gofmt         | —         |
| 脚本语言      | Python                            | ruff          | —         |
| 脚本语言      | Bash / Shell                      | shfmt         | —         |
| 协议定义      | Protocol Buffers                  | clang-format  | —         |
| 硬件描述      | Verilog                           | clang-format  | —         |

> **PHP 暂未接入**（需要 `@prettier/plugin-php`），前端会直接拦截并提示，不会发出请求。
>
> 「压缩」只对表中标注 ✅ 的语言可用，其余语言该按钮是禁用状态——这些语言没有可靠的压缩实现，此前点压缩实际等于再格式化一次，容易误导。

## 架构

```
浏览器（Monaco 编辑器 + 键盘交互）
   │  POST /api/format  { lang, code, action, tabWidth, useTabs }
   ▼
Node 服务（server.js → src/）
   ├─ prettier / sql-formatter / terser / xml-formatter   npm 包
   ├─ clang-format · gofmt                               复用 vendor/wasm（Node 端加载）
   ├─ ruff                                               @astral-sh/ruff-wasm-nodejs（纯 wasm）
   └─ shfmt                                              @wasm-fmt/shfmt（纯 wasm）
   │  返回 { ok: true, result } 或 { ok: false, error, line, col }
   ▼
浏览器回填输出区，并按 line/col 高亮出错行
```

语言清单由 `shared/languages.mjs` 这一份注册表同时驱动前端下拉与后端引擎分派，新增语言只需改这一处（见下文）。

## 部署

### Docker（推荐：飞牛 FnOS / 群晖 / 裸 docker compose）

镜像由 GitHub Actions 自动构建并推送到 GHCR：

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

> 若 NAS 拉取 `ghcr.io` 慢或超时，可在飞牛 Docker 设置里添加 GitHub 容器镜像加速（如 `ghcr.nju.edu.cn`），或把 compose 中镜像改为 `ghcr.nju.edu.cn/ac6855/code-formatter:latest`。镜像需为**公开**才能免登录拉取；若拉取报 401，去 GitHub → Packages → code-formatter → 设为 Public。

镜像内置 `HEALTHCHECK`，以 `/api/health` 的 `backendReady` 为准——只探端口通会漏掉「依赖缺失导致引擎没加载上」的情况。

### 飞牛 FnOS 桌面化（WatchCow）

在飞牛上除了直接访问 `http://<NASIP>:4317`，还可以用 [WatchCow](https://github.com/tf4fun/watchcow) 把容器注册成 FnOS 原生桌面应用——不用记端口、不必进容器列表翻找。注意 WatchCow 是**飞牛 FnOS 专用**工具，不是通用面板，群晖 / QNAP 上用不了。

1. 从它的 [Releases](https://github.com/tf4fun/watchcow/releases) 下载 `watchcow.fpk`，在飞牛应用中心用「本地安装」装上；
2. 在 Docker 里新建项目，粘贴 `docker-compose.watchcow.yml`，启动后自动出现在桌面。

那个 compose 里有三处值得说明，都是核对过的：

- **标签名分版本**。WatchCow v0.2 做过一次重命名，网上的教程两种写法都还在流传：v0.1 的 `watchcow.title` / `watchcow.description` / `watchcow.port` / `watchcow.appName` 已失效，新名是 `watchcow.display_name` / `watchcow.desc` / `watchcow.service_port` / `watchcow.appname`。本项目用的是 v0.2+ 的名字。
- **图标必须显式指定**。不写 `watchcow.icon` 时，WatchCow 会拿镜像名去 dashboard-icons 查，而那里没有 `code-formatter` 这个条目（实测 404），桌面图标会退化成通用 Docker 图标。compose 里已指向一个确认存在的通用代码图标；要换成自己的图，`file://` 绝对路径和 `file://./相对路径`（相对 compose 所在目录）都支持，PNG/JPEG/WebP/BMP/ICO 均可，按文件内容识别格式、不看扩展名。
- **`trim-default` 外部网络已注释掉**。原文件引用了它（原注释自述是「沿用 metube 完整模板」），而该网络一旦在目标机器上不存在，`docker compose up` 会直接失败。WatchCow 官方示例（memos / nginx）都不声明自定义网络——应用注册只依赖标签、与容器挂在哪个网络无关，本服务又是单容器无内部通信，走默认 bridge 即可；确有共用需要再取消注释。

> 若创建项目时报 `pull_policy` 相关语法错，说明该飞牛的 compose 版本较老，删掉 `docker-compose.yml` 里那一行即可。

## 本地开发

```bash
npm ci            # 严格按 package-lock.json 安装依赖
npm start         # 启动服务，访问 http://localhost:4317
npm test          # 运行冒烟测试（node --test）
npm run format    # 用项目自带的 prettier 格式化本仓库代码
```

端口可用环境变量覆盖：`PORT=8080 npm start`。

自行构建镜像：

```bash
docker build -t code-formatter .
docker run -d -p 4317:4317 code-formatter
```

## 目录结构

```
server.js               入口：读 PORT、加载引擎、启动服务、处理端口占用与信号
src/
  config.mjs            端口、监听地址、请求体上限等运行参数
  backend.mjs           引擎的懒加载门面（依赖缺失时降级为 503 而不是进程起不来）
  http-server.mjs       路由：/api/health、/api/format，其余交给静态服务
  static.mjs            静态文件服务（多根挂载、ETag/304、gzip、防目录穿越）
  formatter/
    index.mjs           统一格式化入口：语言 → 引擎分派、压缩分派
    engines.mjs         wasm 引擎的加载、状态与串行调用
    errors.mjs          各引擎原始报错 → 统一中文提示 + 行列号
shared/
  languages.mjs         语言注册表（前后端共用的唯一事实来源）
public/                 前端静态资源（服务端挂载在 /）
  index.html            页面骨架
  style.css             样式，主题用 CSS 变量实现
  js/
    main.mjs            装配：生成语言下拉、创建编辑器、绑定事件
    actions.mjs         用户动作：格式化 / 压缩 / 示例 / 清空 / 复制 / 粘贴 / 下载 / 主题
    editor.mjs          编辑器实例与编辑器级操作（语言、换行、错误行高亮）
    api.mjs             后端接口调用
    ui.mjs              界面输出与表单取值（所有 DOM 读写收口于此）
    monaco.mjs          Monaco 运行环境与加载
    languages.mjs       前端侧的语言视图
  vs/                   Monaco 编辑器（amd 版，含 84 种基础语言高亮）
vendor/wasm/            clang-format 与 gofmt 的 wasm 引擎（Node 端加载）
test/smoke.test.mjs     冒烟测试
```

> `public/vs/language/` 下只有 `*Mode.js`：Monaco 会优先调用 `MonacoEnvironment.getWorker`，而本项目在那里返回了一个内联空 worker，因此 `*Worker.js` 永远不会被请求——语言服务 worker 被有意禁用（格式化交给后端，前端只需语法高亮）。这省掉了约 7MB 下载。

## 新增一门语言

重构前，同一门语言的元数据分散在 6 个地方（HTML 的 `<option>`、`MONACO_LANG`、`SAMPLES`、下载扩展名映射、`UNSUPPORTED`、后端 `switch` 与 clang 预设），加一门语言要同步改 6 处、极易漏改。

现在只需在 `shared/languages.mjs` 的 `LANGUAGES` 数组里加一项：

```js
{
  id: 'rust',              // 前后端统一标识，也是 /api/format 的 lang 参数
  label: 'Rust',           // 下拉菜单显示名
  group: '系统 / 编译型',   // 所属分组（新分组会自动出现在下拉里）
  monaco: 'rust',          // Monaco 语言 id —— 注意与 id 不一定相同（如 bash → shell）
  ext: 'rs',               // 下载时的文件扩展名
  sample: 'fn main(){}',   // 示例代码
  engine: 'clang',         // 引擎
  clangFile: 'a.rs',       // engine 为 clang 时，用虚拟文件名让 clang-format 判定语言
  clangStyle: 'LLVM',      // engine 为 clang 时的预设风格
  minify: undefined,       // 可选：terser | json | sql | xml
}
```

前端下拉、示例、高亮、下载扩展名、压缩按钮可用性，以及后端的引擎分派都会自动跟上。

`npm test` 里有一条测试会校验每种语言声明的 `monaco` id 真实存在于 Monaco 中——写错会被立刻拦下（`proto` 就属于这种情况：Monaco 里 Protocol Buffers 的 id 是 `proto` 而不是 `protobuf`）。

## 测试

`npm test` 覆盖四类回归风险：

1. **注册表自洽** —— id 唯一、示例非空、Monaco id 真实存在。
2. **格式化行为** —— 每种受支持语言都能格式化自己的示例且结果幂等；缩进选项生效；压缩确实更短。
3. **错误反馈** —— 会校验语法的引擎要报出正确行号；`clang-format` / `sql-formatter` / `xml-formatter` 不校验语法，这一行为被显式记录成测试，避免日后被误当成回归。
4. **HTTP 层** —— 健康检查、静态资源、目录穿越防护、方法限制、畸形 URI、gzip、ETag/304，以及一项「资源图」测试：把 `index.html` 与前端各模块引用的每个路径都真实请求一遍，前端目录结构调整时能立刻发现漏改的路径。

## 许可

MIT

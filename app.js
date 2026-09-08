// 纯前端代码格式化器 —— 所有格式化在浏览器内完成，离线、无后端、无外部依赖
// 引擎：Prettier(JS/TS/JSON/YAML/HTML/CSS/SCSS/LESS/MD) + sql-formatter(SQL) + terser(JS压缩)
//      + clang-format-wasm(C/C++/C#/ObjC/Java/Proto/Verilog) + gofmt-wasm(Go) + PrettierExtra(PHP) + XMLFormatter(XML)
// Monaco 用 inline 空 worker，兼容任意静态 httpd（含 busybox）

self.MonacoEnvironment = {
  getWorker: function () {
    const blob = new Blob(['self.onmessage=function(){};'], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
  },
};

// file:// 或异常响应时 instantiateStreaming 可能失败 —— 兜底为 arrayBuffer 方式
if (typeof WebAssembly !== 'undefined' && !WebAssembly.__patched) {
  const orig = WebAssembly.instantiateStreaming;
  WebAssembly.instantiateStreaming = async function (resp, imports) {
    try { return await orig(resp, imports); }
    catch (e) {
      const buf = (resp && typeof resp.arrayBuffer === 'function') ? await resp.arrayBuffer() : resp;
      return WebAssembly.instantiate(buf, imports);
    }
  };
  WebAssembly.__patched = true;
}

const MONACO_LANG = {
  javascript: 'javascript', typescript: 'typescript', json: 'json', yaml: 'yaml',
  html: 'html', css: 'css', scss: 'scss', less: 'less', markdown: 'markdown', sql: 'sql',
  xml: 'xml', java: 'java', c: 'c', cpp: 'cpp', csharp: 'csharp', objc: 'objective-c',
  go: 'go', python: 'python', php: 'php', bash: 'shell', verilog: 'verilog',
};

// 三个 wasm 引擎 + PrettierExtra（PHP）+ XMLFormatter（XML）运行期填充
const ENGINES = { clang: null, gofmt: null, ruff: null, extra: null, xml: null, ready: false };

async function initEngines() {
  try {
    const [cf, gf, rf] = await Promise.all([
      import('./vendor/wasm/clang-format-web.js'),
      import('./vendor/wasm/gofmt_web.js'),
      import('./vendor/wasm/ruff_wasm.js'),
    ]);
    // 各包的初始化函数为 default 导出
    await Promise.all([cf.default(), gf.default(), rf.default()]);
    ENGINES.clang = cf;            // .format(src, fileName, styleJson)
    ENGINES.gofmt = gf.format;     // format(src)
    ENGINES.ruff = rf;             // .run(...)
    ENGINES.extra = window.PrettierExtra || null;   // { format, plugins }（PHP）
    ENGINES.xml = window.xmlFormatter || window.XMLFormatter || null;  // 浏览器全局 xmlFormatter（本身即 format 函数，minify 为其属性）
    ENGINES.ready = true;
    setEngineStatus('引擎就绪 ✓', false);
  } catch (e) {
    console.error(e);
    setEngineStatus('部分引擎加载失败：' + (e && e.message ? e.message : e), true);
  }
}

// 缩进选项 → 实际缩进字符串（供 XML 等需要字符串缩进的引擎使用）
function indentStr(o) {
  return (o && o.useTabs) ? '\t' : ' '.repeat((o && o.tabWidth) || 2);
}

function minifyXml(c) {
  return c.replace(/>\s*</g, '><').trim() + '\n';
}

// —— 语言能力声明（声明式：新增语言只需在此登记一项）——
// engine: prettier | sql | xml | prettier-php | clang | gofmt | ruff
const LANGS = {
  javascript: { engine: 'prettier', parser: 'babel',      minify: 'terser' },
  typescript: { engine: 'prettier', parser: 'typescript' },
  json:       { engine: 'prettier', parser: 'json',       minify: 'json' },
  yaml:       { engine: 'prettier', parser: 'yaml' },
  html:       { engine: 'prettier', parser: 'html' },
  css:        { engine: 'prettier', parser: 'css' },
  scss:       { engine: 'prettier', parser: 'scss' },
  less:       { engine: 'prettier', parser: 'less' },
  markdown:   { engine: 'prettier', parser: 'markdown' },

  sql:        { engine: 'sql',      minify: 'sql' },
  xml:        { engine: 'xml',      minify: 'xml-collapse', needsEngine: 'xml' },
  php:        { engine: 'prettier-php' },

  java:       { engine: 'clang', file: 'A.java', preset: 'Google' },
  c:          { engine: 'clang', file: 'a.c',    preset: 'LLVM' },
  cpp:        { engine: 'clang', file: 'a.cpp',  preset: 'LLVM' },
  csharp:     { engine: 'clang', file: 'a.cs',   preset: 'Microsoft' },
  objc:       { engine: 'clang', file: 'a.m',    preset: 'WebKit' },
  // clang-format 原生支持 proto / verilog（实测通过）
  proto:      { engine: 'clang', file: 'a.proto', preset: 'Google' },
  verilog:    { engine: 'clang', file: 'a.v',     preset: 'LLVM' },

  go:         { engine: 'gofmt' },
  python:     { engine: 'ruff', note: 'Python 纯前端格式化暂不可用（ruff-wasm 仅提供 check/lint，无 format 接口），请用后端模式' },

  bash:       { unsupported: true },
};

// 将能力声明编译为统一的 { format, minify?, needsEngine? } 接口
function compileFormatter(spec) {
  if (spec.unsupported) return { unsupported: true };

  switch (spec.engine) {
    case 'prettier': {
      const out = { format: (c, o) => prettier.format(c, { parser: spec.parser, plugins: prettierPlugins, ...o }) };
      if (spec.minify === 'terser') out.minify = async (c) => (await terser.minify(c)).code;
      else if (spec.minify === 'json') out.minify = (c) => JSON.stringify(JSON.parse(c));
      return out;
    }
    case 'sql': {
      const out = { format: (c, o) => sqlFormatter.format(c, { language: 'sql', tabWidth: (o && o.tabWidth) || 2, keywordCase: 'upper' }) };
      if (spec.minify === 'sql') out.minify = (c) => sqlFormatter.format(c, { language: 'sql', tabWidth: 0 }).replace(/\s+/g, ' ').trim() + '\n';
      return out;
    }
    case 'xml': {
      const out = { needsEngine: 'xml', format: (c, o) => ENGINES.xml(c, { indentation: indentStr(o), collapseContent: false, lineSeparator: '\n' }) };
      if (spec.minify === 'xml-collapse') out.minify = minifyXml;
      return out;
    }
    case 'prettier-php':
      return { needsEngine: 'extra', format: (c, o) => ENGINES.extra.format(c, { parser: 'php', plugins: ENGINES.extra.plugins, ...o }) };
    case 'clang':
      return {
        needsEngine: 'clang',
        format: (c, o) => ENGINES.clang.format(c, spec.file, JSON.stringify({ BasedOnStyle: spec.preset, IndentWidth: (o && o.tabWidth) || 2, UseTab: !!(o && o.useTabs) })),
      };
    case 'gofmt':
      return { needsEngine: 'gofmt', format: (c) => ENGINES.gofmt(c) };
    case 'ruff':
      return {
        needsEngine: 'ruff',
        format: async (c) => {
          try {
            const out = ENGINES.ruff.run(['format', '--stdin-filename', 'snippet.py', '-']);
            if (typeof out === 'string' && out.trim()) return out;
          } catch (_) { /* best-effort，失败走下方明确提示 */ }
          throw new Error(spec.note);
        },
      };
    default:
      return { unsupported: true };
  }
}

// 编译为实际格式化器表（取值语义与原 FORMATTERS 完全一致）
const FORMATTERS = Object.fromEntries(Object.entries(LANGS).map(([k, v]) => [k, compileFormatter(v)]));

const SAMPLES = {
  javascript: "const x={a:1,b:2};function   foo(bar){return bar&&true?1:0}",
  typescript: "interface User{id:number;name:string}const u:User={id:1,name:'a'}",
  json: '{"name":"demo","nested":{"a":1,"b":[1,2,3]},"ok":true}',
  yaml: 'name: demo\nversion: 1.0\ndeps:\n  - a\n  - b\nmeta: {x: 1, y: 2}',
  html: '<div><p class="x">hello</p><span>world</span></div>',
  css: 'a{color:red;background:#fff}@media screen{.b{margin:0}}',
  scss: '.card{color:red;.badge{margin:0;padding:4px}}',
  less: '.card{color:red;.badge{margin:0;padding:4px}}',
  markdown: '# Title\n\n## Sub\n\n- one\n- two\n\n```js\nconst a=1\n```',
  sql: 'select id,name from users where age>18 order by name desc limit 10',
  xml: '<root><item id="1"><name>demo</name></item><item id="2"><name>test</name></item></root>',
  java: 'public class  T{public static void main(String[]a){if(true){int x=1;System.out.println(x);}}}',
  c: 'int main(){int x=1;if(x){printf("hi");}return 0;}',
  cpp: 'template<class T>class A{public:void f(T t){std::cout<<t;}};int main(){A<int>a;a.f(1);}',
  csharp: 'class C{public int X{get;set;}void M(){if(X>0){System.Console.WriteLine(X);}}}',
  objc: '@interface A:NSObject{int x;}@end@implementation A-(void)m{if(x>0){NSLog(@"%d",x);}}@end',
  proto: 'syntax="proto3";message User{string name=1;int32 id=2;repeated string tags=3;}',
  verilog: 'module top(input clk,output reg q);always@(posedge clk)begin q<=~q;end endmodule',
  go: 'package main\nimport "fmt"\nfunc main(){x:=1;if x>0{fmt.Println(x)}}',
  python: 'def foo( x,y ):\n    if x:\n        return x+y\n    else:\n        return y',
  php: '<?php function foo($a){return $a?1:0;} $x=array(1,2,3);',
  bash: 'if [ $x -gt 0 ]; then echo hi; fi',
  verilog: 'module top(input clk,output reg q);always@(posedge clk)begin q<=~q;end endmodule',
};

let inputEditor, outputEditor;
let lastSampleLang = 'javascript';   // 记录上次载入的示例语言，用于智能切换

function indentOpts() {
  const v = document.getElementById('indent').value;
  if (v === '0') return { useTabs: true, tabWidth: 2 };
  return { useTabs: false, tabWidth: parseInt(v, 10) };
}

function setStatus(msg, isErr) {
  const el = document.getElementById('status');
  el.textContent = msg || '';
  el.className = 'status' + (isErr ? ' err' : '');
}

function setEngineStatus(msg, isErr) {
  const el = document.getElementById('engineStatus');
  el.textContent = msg || '';
  el.className = 'status-pill' + (isErr ? ' err' : '');
}

// 应用换行选项到两个编辑器
function applyWrap(v) {
  const o = { wordWrap: v };
  if (v === 'bounded') o.wordWrapColumn = 120;
  if (inputEditor) inputEditor.updateOptions(o);
  if (outputEditor) outputEditor.updateOptions(o);
}

function setLineInfo(text) {
  const el = document.getElementById('lineInfo');
  if (!text) { el.textContent = ''; return; }
  const lines = text.split('\n').length;
  const chars = text.length;
  el.textContent = `${lines} 行 · ${chars} 字符`;
}

// 运行前的前置阻断检查：返回错误文案，或 null 表示可继续
function checkBlockers(lang, fmt, action) {
  if (!fmt) return '该语言暂不支持';
  if (fmt.unsupported) return `${lang} 纯前端暂不支持，需后端模式`;
  if (fmt.needsEngine && !ENGINES[fmt.needsEngine]) return 'wasm 引擎仍在加载，请稍候再试';
  if (action === 'minify' && !fmt.minify) return `${lang} 暂仅支持格式化，不支持压缩`;
  return null;
}

// —— 错误提示优化：清洗引擎原始消息、提取行/列、给出友好中文文案 ——
let errorDecos = null;                 // 上一次的错误行高亮（运行时清除）
function clearErrorDecos() {
  if (errorDecos) { try { errorDecos.clear(); } catch (_) {} errorDecos = null; }
}

function describeError(e, lang) {
  const raw = (e && e.message) ? e.message : String(e == null ? '' : e);
  let line = null, col = null;

  // 1) 结构化位置（prettier / terser 等可能直接挂在 error 对象上）
  const obj = (e && typeof e === 'object') ? e : null;
  if (obj) {
    const loc = obj.loc && (obj.loc.start || obj.loc);
    if (loc && typeof loc.line === 'number') { line = loc.line; col = (loc.column != null ? loc.column : null); }
    else if (typeof obj.line === 'number') { line = obj.line; col = (obj.col != null ? obj.col : null); }
  }
  // 2) 从消息文本用正则提取位置（line:col / line X column Y / line X）
  if (line == null) {
    const m = raw.match(/(\d+):(\d+)/)
            || raw.match(/line\s+(\d+)[^\d]*column\s+(\d+)/i)
            || raw.match(/(\d+)\s*,\s*column\s+(\d+)/i)
            || raw.match(/line\s+(\d+)/i);
    if (m) { line = parseInt(m[1], 10); col = m[2] != null ? parseInt(m[2], 10) : null; }
  }
  if (line != null && line < 1) line = 1;

  // 3) 清洗消息：去文件名/路径、去各类位置标注、去 ANSI 颜色码、只留首行、截断
  let msg = raw
    .replace(/^\[error\]\s*/i, '')
    .replace(/\x1b\[[0-9;]*m/g, '')             // ANSI 颜色码
    .replace(/\s*\(\d+:\d+\)/g, '')             // (1:10) / (3:4)
    .replace(/\s*\(line\s+\d+[^()]*\)/gi, '')   // (line 2, column 5)
    .replace(/\s*at line\s+\d+(?:,\s*column\s+\d+)?/gi, '') // at line 2, column 5
    .replace(/\s*\([^()]*:\d+:\d+\)/g, '')       // 兜底 (file:line:col)
    .replace(/(?:^|\s)[^\s]*:\d+:\d+:\s*/g, '')  // stdin:1:10: / X.js:3:4:
    .replace(/\s+/g, ' ')
    .split('\n')[0]
    .trim();
  if (!msg) msg = '请检查输入代码的语法';
  if (msg.length > 140) msg = msg.slice(0, 140) + '…';

  // 4) 按错误类别给出中文前缀（比一律“错误：”更可读）
  let prefix = '格式化失败';
  if (/unexpected|expected|missing|mismatch|parse\s*error|syntax/i.test(raw)) prefix = '语法错误';
  else if (/eof|end of (input|file)|unterminated|unexpected end/i.test(raw)) prefix = '语法不完整';
  else if (/indent|width|tab|option|invalid/i.test(raw)) prefix = '配置无效';

  const locText = line != null
    ? `（第 ${line} 行${col != null ? ' · 第 ' + col + ' 列' : ''}）`
    : '';
  return { text: `${prefix}${locText}：${msg}`, line, col };
}

// 在输入区高亮错误行（旧版 Monaco 无 createDecorationsCollection 时降级为仅定位光标）
function markErrorLine(line) {
  clearErrorDecos();
  if (!inputEditor || !inputEditor.createDecorationsCollection) return;
  errorDecos = inputEditor.createDecorationsCollection([{
    range: new monaco.Range(line, 1, line, 1),
    options: { isWholeLine: true, className: 'fmt-error-line', glyphMarginClassName: 'fmt-error-glyph' },
  }]);
}

async function run(action) {
  const lang = document.getElementById('lang').value;
  const fmt = FORMATTERS[lang];

  const block = checkBlockers(lang, fmt, action);
  if (block) { setStatus(block, true); return; }

  const code = inputEditor.getValue();
  if (!code.trim()) { setStatus('请输入代码', true); return; }

  clearErrorDecos();   // 清掉上一次的错误行高亮
  try {
    const opts = indentOpts();
    const result = action === 'minify'
      ? await fmt.minify(code, opts)
      : await fmt.format(code, opts);
    outputEditor.setValue(result);
    setLineInfo(result);
    setStatus(action === 'minify' ? '压缩完成' : '格式化完成');
  } catch (e) {
    const d = describeError(e, lang);
    setStatus(d.text, true);
    if (d.line != null) {
      inputEditor.revealLineInCenter(d.line);
      inputEditor.setPosition({ lineNumber: d.line, column: 1 });
      markErrorLine(d.line);
      inputEditor.focus();
    }
    // 原始堆栈/消息保留在控制台，便于排查
    console.error('[format error]', e && e.stack ? e.stack : e);
  }
}

// 载入指定（或当前）语言的示例
function loadSample(lang) {
  lang = lang || document.getElementById('lang').value;
  inputEditor.setValue(SAMPLES[lang] || '');
  lastSampleLang = lang;
  setStatus('已载入示例');
}

// 切换语言：更新高亮，并智能载入对应示例（若当前内容仍是上一示例/为空则不覆盖用户已输入代码）
function onLangChange(lang) {
  const m = MONACO_LANG[lang] || 'plaintext';
  monaco.editor.setModelLanguage(inputEditor.getModel(), m);
  monaco.editor.setModelLanguage(outputEditor.getModel(), m);
  const cur = inputEditor.getValue();
  const prevSample = SAMPLES[lastSampleLang];
  if (!cur.trim() || cur === prevSample) {
    loadSample(lang);
    setStatus(`已切换至 ${lang} · 已载入示例`);
  } else {
    lastSampleLang = lang;
    setStatus(`已切换至 ${lang}`);
  }
  outputEditor.setValue('');
  setLineInfo('');
}

require.config({ paths: { vs: './vs' } });
require(['vs/editor/editor.main'], () => {
  const common = {
    automaticLayout: true, fontSize: 13, minimap: { enabled: false },
    scrollBeyondLastLine: false, wordWrap: 'on',
    fontLigatures: true, renderWhitespace: 'selection', tabSize: 2,
  };
  inputEditor = monaco.editor.create(document.getElementById('editor'), { ...common, value: SAMPLES.javascript, language: 'javascript' });
  outputEditor = monaco.editor.create(document.getElementById('output'), { ...common, language: 'javascript' });

  // 与「换行」下拉默认值同步（下拉默认即为 on，这里再显式同步一次，避免二者不一致）
  applyWrap(document.getElementById('wrap').value);

  // —— 主题切换（亮 / 暗）——
  let dark = false;
  function toggleTheme(){
    dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    monaco.editor.setTheme(dark ? 'vs-dark' : 'vs');
    document.getElementById('themeBtn').textContent = dark ? '☀️ 亮色' : '🌓 暗色';
  }

  // —— 下载结果 ——
  function downloadResult(){
    const text = outputEditor.getValue();
    if(!text){ setStatus('无内容可下载', true); return; }
    const l = document.getElementById('lang').value;
    const ext = ({ javascript:'js', typescript:'ts', json:'json', yaml:'yaml', html:'html', css:'css',
      scss:'scss', less:'less', markdown:'md', sql:'sql', xml:'xml', java:'java', c:'c',
      cpp:'cpp', csharp:'cs', objc:'m', go:'go', python:'py', php:'php', proto:'proto',
      verilog:'v', bash:'sh' })[l] || 'txt';
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'formatted.' + ext;
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    setStatus('已下载 formatted.' + ext);
  }

  // —— 粘贴到输入 ——
  async function pasteInput(){
    try {
      const t = await navigator.clipboard.readText();
      if(t != null){ inputEditor.setValue(t); setStatus('已粘贴到输入'); }
    } catch (e) { setStatus('粘贴失败（浏览器/Electron 可能限制了剪贴板读取权限）', true); }
  }

  // —— 事件绑定 ——
  document.getElementById('lang').addEventListener('change', (e) => onLangChange(e.target.value));
  document.getElementById('indent').addEventListener('change', () => { /* 下次格式化生效 */ });
  document.getElementById('wrap').addEventListener('change', (e) => applyWrap(e.target.value));

  document.getElementById('formatBtn').addEventListener('click', () => run('format'));
  document.getElementById('minifyBtn').addEventListener('click', () => run('minify'));
  document.getElementById('sampleBtn').addEventListener('click', () => loadSample());
  document.getElementById('clearBtn').addEventListener('click', () => {
    inputEditor.setValue(''); outputEditor.setValue(''); setLineInfo(''); setStatus('');
    lastSampleLang = document.getElementById('lang').value;
  });
  document.getElementById('copyBtn').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(outputEditor.getValue()); setStatus('已复制'); }
    catch { setStatus('复制失败，请手动选择', true); }
  });
  document.getElementById('pasteBtn').addEventListener('click', pasteInput);
  document.getElementById('downloadBtn').addEventListener('click', downloadResult);
  document.getElementById('themeBtn').addEventListener('click', toggleTheme);

  // Ctrl/⌘ + Enter：格式化（使用 Monaco 官方 addCommand，跨平台且聚焦即触发；
  // 规避 onKeyDown 回调里 e.key 不可靠导致的「快捷键不好使」问题）
  const cmdFormat = () => run('format');
  inputEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, cmdFormat);
  outputEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, cmdFormat);

  // Cmd/Ctrl + S：下载结果（阻止浏览器“保存网页”）
  window.addEventListener('keydown', (e) => {
    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's'){ e.preventDefault(); downloadResult(); }
  });

  // 启动 wasm 引擎加载（与编辑器并行）
  initEngines();
});

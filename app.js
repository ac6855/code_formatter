// 代码格式化器（前端）—— 格式化计算交由后端 /api/format 完成，前端仅负责编辑与交互。
// 这样浏览器只需加载 Monaco 编辑器，不再下发庞大的 wasm/JS 引擎，网速差时加载更快。
self.MonacoEnvironment = {
  getWorker: function () {
    const blob = new Blob(['self.onmessage=function(){};'], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
  },
};

const MONACO_LANG = {
  javascript: 'javascript', typescript: 'typescript', json: 'json', yaml: 'yaml',
  html: 'html', css: 'css', scss: 'scss', less: 'less', markdown: 'markdown', sql: 'sql',
  xml: 'xml', java: 'java', c: 'c', cpp: 'cpp', csharp: 'csharp', objc: 'objective-c',
  go: 'go', python: 'python', php: 'php', bash: 'shell', verilog: 'verilog',
};

// 前端预判：这些语言后端暂未实现，直接拦截并提示，避免无谓请求
const UNSUPPORTED = {
  php: 'PHP 后端格式化暂未接入（需 @prettier/plugin-php），后续版本支持',
};

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

// 错误行高亮相关
let errorDecos = null;
function clearErrorDecos() {
  if (errorDecos) { try { errorDecos.clear(); } catch (_) {} errorDecos = null; }
}
function markErrorLine(line) {
  clearErrorDecos();
  if (!inputEditor || !inputEditor.createDecorationsCollection) return;
  errorDecos = inputEditor.createDecorationsCollection([{
    range: new monaco.Range(line, 1, line, 1),
    options: { isWholeLine: true, className: 'fmt-error-line', glyphMarginClassName: 'fmt-error-glyph' },
  }]);
}

// 调用后端格式化引擎
async function run(action) {
  const lang = document.getElementById('lang').value;
  if (UNSUPPORTED[lang]) { setStatus(UNSUPPORTED[lang], true); return; }

  const code = inputEditor.getValue();
  if (!code.trim()) { setStatus('请输入代码', true); return; }

  clearErrorDecos();
  setStatus('正在格式化…');
  try {
    const opts = indentOpts();
    const resp = await fetch('/api/format', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang, code, action, tabWidth: opts.tabWidth, useTabs: opts.useTabs }),
    });
    const text = await resp.text();
    let data;
    try { data = JSON.parse(text); }
    catch {
      throw new Error('后端返回内容为空或非 JSON（请确认服务端已更新为后端版本、且容器内已安装依赖 node_modules）');
    }
    if (!resp.ok) throw new Error('后端返回 HTTP ' + resp.status + (data && data.error ? '：' + data.error : ''));
    if (!data || typeof data !== 'object') throw new Error('后端返回格式异常');

    if (!data.ok) {
      setStatus(data.error || ('格式化失败：' + resp.status), true);
      if (data.line != null) {
        inputEditor.revealLineInCenter(data.line);
        inputEditor.setPosition({ lineNumber: data.line, column: 1 });
        markErrorLine(data.line);
        inputEditor.focus();
      }
      return;
    }

    outputEditor.setValue(data.result);
    setLineInfo(data.result);
    setStatus(action === 'minify' ? '压缩完成' : '格式化完成');
  } catch (e) {
    setStatus('请求后端失败：' + (e && e.message ? e.message : e), true);
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

  // 真实探测后端健康状态，而非写死“已连接”
  checkBackendHealth();
});

// 启动即探测一次 /api/health：页面能开只代表静态资源可达，
// 不代表后端进程/引擎真的就绪，所以要用一次真实请求来定状态。
async function checkBackendHealth() {
  try {
    const r = await fetch('/api/health');
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const d = await r.json();
    if (d.ok && d.backendReady) {
      const e = d.engines || {};
      const miss = [];
      if (!e.clang) miss.push('clang-format');
      if (!e.gofmt) miss.push('gofmt');
      if (miss.length) setEngineStatus('后端已连接 · 引擎缺失(' + miss.join('/') + ')', true);
      else setEngineStatus('后端已连接 ✓', false);
    } else {
      setEngineStatus('后端已就绪 · 引擎未加载', true);
    }
  } catch {
    setEngineStatus('后端未连接 ✗', true);
  }
}

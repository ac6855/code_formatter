/**
 * 冒烟测试：跑 `npm test` 即可执行（node --test）。
 *
 * 覆盖四类回归风险：
 *   1. 语言注册表自洽 —— 特别是「注册表里的 Monaco id 必须真实存在」，
 *      这条能防止重构前那种「.proto 因为 MONACO_LANG 漏键而退化成纯文本」的问题再次发生。
 *   2. 格式化行为 —— 每种语言都能格式化自己的示例，且格式化幂等；缩进与压缩按预期生效。
 *   3. 错误反馈 —— 语法错误要带出正确的行列号，未接入语言要给明确提示。
 *   4. HTTP 层 —— 健康检查、静态资源、目录穿越防护、方法限制、畸形 URI。
 *
 * 第 4 类里还包含一个「资源图」测试：把 index.html 与前端各模块里引用的
 * 每一个资源路径都真实请求一遍。前端目录结构调整时，它能立刻发现漏改的路径。
 */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { startServer } from '../src/http-server.mjs';
import { LANGUAGES, toClientLanguages } from '../shared/languages.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SUPPORTED = LANGUAGES.filter((l) => l.engine);

let server;
let baseUrl;

test.before(async () => {
  const handle = await startServer(0); // 0 = 交给系统分配空闲端口，避免与本地服务撞车
  server = handle.server;
  baseUrl = `http://127.0.0.1:${handle.port}`;
});

test.after(() => server?.close());

async function apiFormat(params) {
  const resp = await fetch(`${baseUrl}/api/format`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return { status: resp.status, body: await resp.json() };
}

function formatSample(language, overrides = {}) {
  return apiFormat({
    lang: language.id,
    code: language.sample,
    action: 'format',
    tabWidth: 2,
    useTabs: false,
    ...overrides,
  });
}

// ————————————————————————— 1. 语言注册表 —————————————————————————

test('注册表：语言 id 唯一、示例非空、受支持语言都有引擎', () => {
  const ids = LANGUAGES.map((l) => l.id);
  assert.equal(new Set(ids).size, ids.length, '存在重复的语言 id');

  for (const language of LANGUAGES) {
    assert.ok(language.sample.trim(), `${language.id} 缺少示例代码`);
    assert.ok(language.label, `${language.id} 缺少显示名`);
    assert.ok(language.group, `${language.id} 缺少分组`);
    assert.ok(language.ext, `${language.id} 缺少文件扩展名`);
    assert.ok(language.monaco, `${language.id} 缺少 Monaco 语言 id`);
    // 要么有引擎，要么明确说明为什么没有——不能两者都缺
    assert.ok(language.engine || language.unsupported, `${language.id} 既没有引擎也没有未接入说明`);
  }
});

test('注册表：每种语言的 Monaco 高亮 id 都真实存在于 Monaco 中', async () => {
  const monacoBundle = await fs.readFile(path.join(ROOT, 'public/vs/editor/editor.main.js'), 'utf8');

  for (const language of LANGUAGES) {
    assert.ok(
      monacoBundle.includes(`id:"${language.monaco}"`),
      `${language.id} 声明的 Monaco 语言 id "${language.monaco}" 在 Monaco 注册表里不存在，会被降级成纯文本`,
    );
  }
});

test('注册表：前端视图不暴露引擎实现细节', () => {
  for (const view of toClientLanguages()) {
    assert.equal(view.engine, undefined);
    assert.equal(view.clangFile, undefined);
    assert.equal(view.parser, undefined);
    assert.equal(typeof view.canMinify, 'boolean');
  }
});

test('注册表：声明支持压缩的语言范围符合预期', () => {
  const minifiable = LANGUAGES.filter((l) => l.minify).map((l) => l.id);
  assert.deepEqual(minifiable, ['javascript', 'json', 'sql', 'xml']);
});

// ————————————————————————— 2. 格式化行为 —————————————————————————

test('格式化：每种受支持语言都能格式化自己的示例', async () => {
  for (const language of SUPPORTED) {
    const { status, body } = await formatSample(language);
    assert.equal(status, 200, `${language.id} 返回了 HTTP ${status}`);
    assert.equal(body.ok, true, `${language.id} 格式化失败：${body.error}`);
    assert.equal(typeof body.result, 'string');
  }
});

test('格式化：幂等（再次格式化结果不变）', async () => {
  for (const language of SUPPORTED) {
    const first = await formatSample(language);
    assert.equal(first.body.ok, true, `${language.id} 首次格式化失败：${first.body.error}`);

    const second = await apiFormat({
      lang: language.id,
      code: first.body.result,
      action: 'format',
      tabWidth: 2,
      useTabs: false,
    });
    assert.equal(second.body.ok, true, `${language.id} 二次格式化失败：${second.body.error}`);
    assert.equal(second.body.result, first.body.result, `${language.id} 的格式化结果不幂等`);
  }
});

test('格式化：缩进选项生效（javascript 用 4 空格与 Tab 得到不同结果）', async () => {
  const code = 'function f(){if(1){return 2}}';

  const spaces = await apiFormat({ lang: 'javascript', code, action: 'format', tabWidth: 4, useTabs: false });
  assert.equal(spaces.body.ok, true);
  assert.match(spaces.body.result, /\n {4}if/, '4 空格缩进未生效');

  const tabs = await apiFormat({ lang: 'javascript', code, action: 'format', tabWidth: 2, useTabs: true });
  assert.equal(tabs.body.ok, true);
  assert.match(tabs.body.result, /\n\tif/, 'Tab 缩进未生效');
});

test('压缩：确实比格式化后的结果更短', async () => {
  for (const language of LANGUAGES.filter((l) => l.minify)) {
    const formatted = await formatSample(language);
    assert.equal(formatted.body.ok, true, `${language.id} 格式化失败：${formatted.body.error}`);

    // 以「先格式化再压缩」的实际用法为准，直接拿示例原文比长度会因原文本就紧凑而误判
    const minified = await apiFormat({
      lang: language.id,
      code: formatted.body.result,
      action: 'minify',
    });
    assert.equal(minified.body.ok, true, `${language.id} 压缩失败：${minified.body.error}`);
    assert.ok(
      minified.body.result.length < formatted.body.result.length,
      `${language.id} 压缩后(${minified.body.result.length}) 未短于格式化结果(${formatted.body.result.length})`,
    );
  }
});

test('压缩：未声明压缩的语言请求压缩也不会报错（后端按格式化处理）', async () => {
  for (const language of SUPPORTED.filter((l) => !l.minify)) {
    const { status, body } = await formatSample(language, { action: 'minify' });
    assert.equal(status, 200, `${language.id} 返回了 HTTP ${status}`);
    assert.equal(body.ok, true, `${language.id} 压缩请求失败：${body.error}`);
  }
});

// ————————————————————————— 3. 错误反馈 —————————————————————————

test('错误：会做语法校验的引擎返回 ok:false 并带出正确行号', async () => {
  const cases = [
    { lang: 'javascript', code: 'function foo( {', line: 1 },
    { lang: 'json', code: '{"a": }', line: 1 },
    { lang: 'css', code: 'a{color:', line: 1 },
    { lang: 'python', code: 'def foo(\n  pass', line: 1 },
    { lang: 'bash', code: 'if [ $x -gt 0 ]; then', line: 1 },
    { lang: 'go', code: 'package main\nfunc main(){', line: 2 },
  ];

  for (const { lang, code, line } of cases) {
    const { status, body } = await apiFormat({ lang, code, action: 'format', tabWidth: 2, useTabs: false });
    assert.equal(status, 200, `${lang} 的语法错误没有按正常响应返回`);
    assert.equal(body.ok, false, `${lang} 的语法错误没有被识别`);
    assert.equal(body.line, line, `${lang} 报出的行号不对（实际 ${body.line}）`);
    assert.ok(body.error, `${lang} 没有给出错误说明`);
  }
});

test('错误：prettier 系列的错误前缀归为「语法错误」', async () => {
  for (const [lang, code] of [
    ['javascript', 'function foo( {'],
    ['json', '{"a": }'],
    ['css', 'a{color:'],
  ]) {
    const { body } = await apiFormat({ lang, code, action: 'format', tabWidth: 2, useTabs: false });
    assert.match(body.error, /^语法错误/, `${lang} 的错误前缀不符合预期：${body.error}`);
  }
});

test('已知行为：clang-format / sql-formatter / xml-formatter 不做语法校验', async () => {
  // 这三个引擎是格式化器而不是解析器，拿到残缺代码也照常输出。
  // 专门写成测试，是为了把这个行为标记为「已知且有意保留」——
  // 将来若某天它们开始报错，这条测试会提醒确认那是不是有意的改动。
  const lenient = [
    ['c', 'int main(){'],
    ['java', 'public class {'],
    ['sql', 'select from where'],
    ['xml', '<root><a></root>'],
  ];

  for (const [lang, code] of lenient) {
    const { body } = await apiFormat({ lang, code, action: 'format', tabWidth: 2, useTabs: false });
    assert.equal(body.ok, true, `${lang} 现在会报语法错误了，请确认这是有意改动`);
  }
});

test('错误：未知语言与未接入语言给出明确提示', async () => {
  const unknown = await apiFormat({ lang: 'nonexistent', code: 'x', action: 'format' });
  assert.equal(unknown.body.ok, false);
  assert.match(unknown.body.error, /暂不支持/);

  const php = await apiFormat({ lang: 'php', code: LANGUAGES.find((l) => l.id === 'php').sample });
  assert.equal(php.body.ok, false);
  assert.match(php.body.error, /PHP/);
});

test('错误：空代码不报错（前端负责拦截「请输入代码」）', async () => {
  const { status, body } = await apiFormat({ lang: 'javascript', code: '', action: 'format' });
  assert.equal(status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.result, '');
});

test('参数：缺失的 tabWidth / action / useTabs 走默认值', async () => {
  const { body } = await apiFormat({ lang: 'javascript', code: 'const a={b:1}' });
  assert.equal(body.ok, true, `默认参数下格式化失败：${body.error}`);
});

// ————————————————————————— 4. HTTP 层 —————————————————————————

test('HTTP：健康检查返回后端与引擎状态', async () => {
  const resp = await fetch(`${baseUrl}/api/health`);
  assert.equal(resp.status, 200);

  const body = await resp.json();
  assert.equal(body.ok, true);
  assert.equal(body.backendReady, true);
  assert.equal(typeof body.engines, 'object');
  // clang-format 与 gofmt 都是从 vendor/wasm 加载的，缺失说明部署不完整
  assert.equal(body.engines.clang, true, 'clang-format 引擎未就绪');
  assert.equal(body.engines.gofmt, true, 'gofmt 引擎未就绪');
});

test('HTTP：请求体不是合法 JSON 时返回 400', async () => {
  const resp = await fetch(`${baseUrl}/api/format`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{ 不是 JSON',
  });
  assert.equal(resp.status, 400);
  assert.match((await resp.json()).error, /JSON/);
});

test('HTTP：静态资源可访问，目录穿越被拦截', async () => {
  for (const urlPath of ['/', '/style.css', '/js/main.mjs', '/shared/languages.mjs', '/vs/loader.js']) {
    const resp = await fetch(`${baseUrl}${urlPath}`);
    assert.equal(resp.status, 200, `${urlPath} 返回 ${resp.status}`);
  }

  for (const urlPath of ['/../server.js', '/shared/../src/config.mjs', '/js/../server.js']) {
    const resp = await fetch(`${baseUrl}${urlPath}`);
    assert.equal(resp.status, 404, `${urlPath} 没有被拦下（返回 ${resp.status}）`);
  }
});

test('HTTP：畸形 URL 编码返回 400 而不是 500', async () => {
  const resp = await fetch(`${baseUrl}/%zz`);
  assert.equal(resp.status, 400);
});

test('HTTP：不支持的方法返回 405', async () => {
  const post = await fetch(`${baseUrl}/`, { method: 'POST' });
  assert.equal(post.status, 405);

  const getApi = await fetch(`${baseUrl}/api/format`);
  assert.equal(getApi.status, 405);
});

test('HTTP：文本资源支持 gzip，且带 Vary: Accept-Encoding', async () => {
  const resp = await fetch(`${baseUrl}/js/main.mjs`, { headers: { 'Accept-Encoding': 'gzip' } });
  assert.equal(resp.status, 200);
  assert.equal(resp.headers.get('content-encoding'), 'gzip');
  assert.match(resp.headers.get('vary') || '', /Accept-Encoding/);
});

test('HTTP：相同表示命中 If-None-Match 时返回 304', async () => {
  const first = await fetch(`${baseUrl}/js/main.mjs`, { headers: { 'Accept-Encoding': 'gzip' } });
  const etag = first.headers.get('etag');
  assert.ok(etag, '响应里没有 ETag');

  const second = await fetch(`${baseUrl}/js/main.mjs`, {
    headers: { 'Accept-Encoding': 'gzip', 'If-None-Match': etag },
  });
  assert.equal(second.status, 304);
});

test('资源图：index.html 与前端模块引用的资源全部可访问', async () => {
  const html = await fs.readFile(path.join(ROOT, 'public/index.html'), 'utf8');

  // index.html 的 <script src> 与 <link href>
  const htmlRefs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(htmlRefs.length >= 3, 'index.html 里没有解析出资源引用，正则可能失效了');

  const moduleDir = 'public/js';
  const moduleFiles = await fs.readdir(path.join(ROOT, moduleDir));
  const jsModules = moduleFiles.filter((f) => f.endsWith('.mjs'));
  assert.ok(jsModules.length > 0, '没有找到前端模块');

  // 各前端模块的 import 说明符
  const importRefs = [];
  for (const file of jsModules) {
    const source = await fs.readFile(path.join(ROOT, moduleDir, file), 'utf8');
    for (const match of source.matchAll(/from\s+'([^']+)'/g)) {
      const spec = match[1];
      if (spec.startsWith('/')) {
        importRefs.push(spec); // 绝对路径，如 /shared/languages.mjs
      } else if (spec.startsWith('.')) {
        // 相对路径，换算成站点根路径（这些模块都位于 public/js/ 下一层）
        importRefs.push('/js/' + path.posix.normalize(path.posix.join('.', spec)));
      }
    }
  }
  assert.ok(importRefs.length > 0, '没有解析出任何模块 import，正则可能失效了');

  const toUrlPath = (ref) => {
    if (ref.startsWith('/')) return ref;
    return '/' + ref.replace(/^\.\//, '');
  };

  for (const ref of [...htmlRefs, ...importRefs]) {
    const urlPath = toUrlPath(ref);
    const resp = await fetch(`${baseUrl}${urlPath}`);
    assert.equal(resp.status, 200, `被引用的资源 ${urlPath} 不可访问（返回 ${resp.status}）`);
  }
});

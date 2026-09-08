// 后端格式化引擎（Node ESM）
// 架构：前端只保留 Monaco 编辑器，格式化计算在 Node 进程完成，经 /api/format 暴露。
// 引擎来源：
//   JS/TS/JSON/YAML/HTML/CSS/SCSS/LESS/MD —— prettier（npm）
//   SQL                                    —— sql-formatter（npm）
//   XML                                    —— xml-formatter（npm）
//   JS 压缩                               —— terser（npm）
//   C/C++/Java/C#/ObjC/Proto/Verilog     —— clang-format（复用前端 vendor/wasm，传字节初始化）
//   Go                                     —— gofmt（复用前端 vendor/wasm）
//   Python                                 —— ruff（@astral-sh/ruff-wasm-nodejs，纯 wasm）
//   Bash / Shell                           —— shfmt（@wasm-fmt/shfmt，纯 wasm）
// 说明：PHP(@prettier/plugin-php) 暂未接入，前端已拦截并提示。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import prettier from 'prettier';
import { format as sqlFormat } from 'sql-formatter';
import { minify as terserMinify } from 'terser';
import XmlFormatter from 'xml-formatter';
import { Workspace, PositionEncoding } from '@astral-sh/ruff-wasm-nodejs';
import * as shfmt from '@wasm-fmt/shfmt';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WASM_DIR = path.join(__dirname, 'vendor', 'wasm');

const ENG = { clang: null, gofmt: null, ready: false };

// 初始化 wasm 引擎：复用前端 vendor/wasm 的 Emscripten/wasm-bindgen 加载器，
// 关键在显式传入 wasm 字节（绕过它对 file:// 的 fetch），使其在 Node 下可用。
export async function initEngines() {
  try {
    const mod = await import(path.join(WASM_DIR, 'clang-format-web.js'));
    await mod.default(fs.readFileSync(path.join(WASM_DIR, 'clang-format.wasm')));
    ENG.clang = mod;
  } catch (e) {
    console.error('[engine] clang-format 初始化失败:', e && e.message ? e.message : e);
  }
  try {
    const mod = await import(path.join(WASM_DIR, 'gofmt_web.js'));
    await mod.default(fs.readFileSync(path.join(WASM_DIR, 'gofmt.wasm')));
    ENG.gofmt = mod;
  } catch (e) {
    console.error('[engine] gofmt 初始化失败:', e && e.message ? e.message : e);
  }
  ENG.ready = true;
}

// 暴露引擎初始化状态，供 /api/health 健康检查使用
export function getEngineStatus() {
  return { ready: ENG.ready, clang: !!ENG.clang, gofmt: !!ENG.gofmt };
}

// 清洗引擎原始错误，提取行/列，给出中文前缀
function describeError(e) {
  const raw = (e && e.message) ? e.message : String(e == null ? '' : e);
  let line = null, col = null;
  const obj = (e && typeof e === 'object') ? e : null;
  if (obj) {
    const loc = obj.loc && (obj.loc.start || obj.loc);
    if (loc && typeof loc.line === 'number') { line = loc.line; col = (loc.column != null ? loc.column : null); }
    else if (typeof obj.line === 'number') { line = obj.line; col = (obj.col != null ? obj.col : null); }
  }
  if (line == null) {
    const m = raw.match(/(\d+):(\d+)/)
      || raw.match(/line\s+(\d+)[^\d]*column\s+(\d+)/i)
      || raw.match(/(\d+)\s*,\s*column\s+(\d+)/i)
      || raw.match(/line\s+(\d+)/i);
    if (m) { line = parseInt(m[1], 10); col = m[2] != null ? parseInt(m[2], 10) : null; }
  }
  if (line != null && line < 1) line = 1;

  let msg = raw
    .replace(/^\[error\]\s*/i, '')
    .replace(/^\[object Object\]:/i, '')
    .replace(/\x1b\[[0-9;]*m/g, '')
    .replace(/^\s*\d+:\d+:\s*/, '') // shfmt 等前缀的 "1:31:"
    .replace(/\s+at byte range\s*\d+\.\.\d+/g, '') // ruff 的 "at byte range 18..19"
    .replace(/\s*\(\d+:\d+\)/g, '')
    .replace(/\s*\(line\s+\d+[^()]*\)/gi, '')
    .replace(/\s*at line\s+\d+(?:,\s*column\s+\d+)?/gi, '')
    .replace(/\s*\([^()]*:\d+:\d+\)/g, '')
    .replace(/(?:^|\s)[^\s]*:\d+:\d+:\s*/g, '')
    .replace(/\s+/g, ' ')
    .split('\n')[0]
    .trim();
  if (!msg) msg = '请检查输入代码的语法';
  if (msg.length > 200) msg = msg.slice(0, 200) + '…';

  let prefix = '格式化失败';
  if (/unexpected|expected|missing|mismatch|parse\s*error|syntax|can only be used to end/i.test(raw)) prefix = '语法错误';
  else if (/eof|end of (input|file)|unterminated|unexpected end/i.test(raw)) prefix = '语法不完整';
  else if (/indent|width|tab|option|invalid/i.test(raw)) prefix = '配置无效';

  const locText = line != null
    ? `（第 ${line} 行${col != null ? ' · 第 ' + col + ' 列' : ''}）`
    : '';
  return { text: `${prefix}${locText}：${msg}`, line, col };
}

const CLANG_LANG_FILE = {
  java: 'A.java', c: 'a.c', cpp: 'a.cpp', csharp: 'a.cs',
  objc: 'a.m', proto: 'a.proto', verilog: 'a.v',
};
const CLANG_PRESET = {
  java: 'Google', c: 'LLVM', cpp: 'LLVM', csharp: 'Microsoft',
  objc: 'WebKit', proto: 'Google', verilog: 'LLVM',
};

/**
 * 统一格式化入口
 * @param {{lang:string, code:string, action?:'format'|'minify', tabWidth?:number, useTabs?:boolean}} param
 * @returns {Promise<{ok:true, result:string}|{ok:false, error:string, line:?number, col:?number}>}
 */
export async function format({ lang, code, action = 'format', tabWidth = 2, useTabs = false }) {
  try {
    let result;
    switch (lang) {
      case 'javascript':
      case 'typescript':
      case 'json':
      case 'yaml':
      case 'html':
      case 'css':
      case 'scss':
      case 'less':
      case 'markdown': {
        if (action === 'minify' && lang === 'javascript') {
          result = (await terserMinify(code, { compress: true, mangle: true })).code;
          break;
        }
        if (action === 'minify' && lang === 'json') {
          result = JSON.stringify(JSON.parse(code));
          break;
        }
        // prettier 的 parser 名与 Monaco 语言 id 不同：JS 对应 'babel'
        result = await prettier.format(code, { parser: lang === 'javascript' ? 'babel' : lang, tabWidth, useTabs });
        break;
      }
      case 'sql': {
        if (action === 'minify') {
          result = sqlFormat(code, { language: 'sql', tabWidth: 0 }).replace(/\s+/g, ' ').trim() + '\n';
        } else {
          result = sqlFormat(code, { language: 'sql', tabWidth, keywordCase: 'upper' });
        }
        break;
      }
      case 'xml': {
        if (action === 'minify') {
          result = code.replace(/>\s*</g, '><').trim() + '\n';
        } else {
          const indent = useTabs ? '\t' : ' '.repeat(tabWidth);
          result = XmlFormatter(code, { indentation: indent, collapseContent: false, lineSeparator: '\n' });
        }
        break;
      }
      case 'java':
      case 'c':
      case 'cpp':
      case 'csharp':
      case 'objc':
      case 'proto':
      case 'verilog': {
        if (!ENG.clang) throw new Error('clang-format 引擎未就绪');
        result = ENG.clang.format(
          code,
          CLANG_LANG_FILE[lang],
          JSON.stringify({ BasedOnStyle: CLANG_PRESET[lang], IndentWidth: tabWidth, UseTab: useTabs }),
        );
        break;
      }
      case 'go': {
        if (!ENG.gofmt) throw new Error('gofmt 引擎未就绪');
        result = ENG.gofmt.format(code);
        break;
      }
      case 'python': {
        // ruff 在 Node 下以 Workspace API 提供格式化，纯 wasm、无需系统装 Python。
        // useTabs 时切到 tab 缩进；否则按前端选的 tabWidth（空格）。
        const ws = new Workspace(
          {
            'indent-width': useTabs ? 4 : tabWidth,
            format: {
              'indent-style': useTabs ? 'tab' : 'space',
              'quote-style': 'double',
            },
          },
          PositionEncoding.Utf8,
        );
        try {
          result = ws.format(code);
        } catch (fe) {
          // 语法错误：用 check() 取精确行列，供前端高亮
          let line = null, col = null;
          try {
            const diags = ws.check(code);
            if (Array.isArray(diags) && diags[0] && diags[0].start_location) {
              line = diags[0].start_location.row;
              col = diags[0].start_location.column;
            }
          } catch (_) { /* 忽略 check 失败，退回消息解析 */ }
          const err = new Error(fe && fe.message ? fe.message : String(fe));
          if (line != null) { err.line = line; err.col = col; }
          throw err;
        }
        break;
      }
      case 'bash': {
        // shfmt：shell=1 即 bash 方言；indent 为空格数，本包装未暴露 tab 选项，故统一按 tabWidth 空格缩进。
        result = shfmt.format(code, { indent: tabWidth, shell: 1 });
        break;
      }
      case 'php':
        throw new Error('PHP 暂未接入后端（需 @prettier/plugin-php），后续版本支持');
      default:
        throw new Error('该语言暂不支持');
    }
    return { ok: true, result };
  } catch (e) {
    const d = describeError(e);
    return { ok: false, error: d.text, line: d.line, col: d.col };
  }
}

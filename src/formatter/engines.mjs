/**
 * 格式化引擎的生命周期与调用适配。
 *
 * 引擎来源：
 *   clang-format —— 复用 vendor/wasm 里前端时代的 Emscripten 产物，在 Node 下显式喂 wasm 字节加载
 *   gofmt        —— 同上（wasm-bindgen 产物）
 *   ruff         —— @astral-sh/ruff-wasm-nodejs（纯 wasm，无需系统装 Python）
 *   shfmt        —— @wasm-fmt/shfmt（纯 wasm）
 *
 * 之所以在这里集中管理，是因为这些 wasm 引擎内部都是「单例 + 可变状态」，
 * 并发调用同一次格式化会互相踩状态（clang-format 尤其明显：它把上一次的
 * 源码缓存在实例里）。因此所有 wasm 调用都经 withEngineLock 串行化；
 * 纯 JS 的引擎（prettier / sql-formatter / terser / xml-formatter）不受影响，
 * 仍可并发执行。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Workspace, PositionEncoding } from '@astral-sh/ruff-wasm-nodejs';
import * as shfmt from '@wasm-fmt/shfmt';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const WASM_DIR = path.resolve(HERE, '..', '..', 'vendor', 'wasm');

/** clang-format / gofmt 的 wasm 模块句柄，initEngines 成功后才有值。 */
const engines = { clang: null, gofmt: null };

/** 记录引擎是否走过一遍初始化流程（含加载失败的情况），供健康检查区分「未初始化」与「初始化失败」。 */
let initialized = false;

// —— 串行锁：按 key 排队，避免同一 wasm 实例被并发重入 ——
const locks = new Map();

/**
 * 把 fn 排到 key 对应的队尾执行，保证同一 key 上的调用串行。
 * @template T
 * @param {string} key
 * @param {() => T | Promise<T>} fn
 * @returns {Promise<T>}
 */
function withEngineLock(key, fn) {
  const prev = locks.get(key) || Promise.resolve();
  const next = prev.then(fn);
  // 队尾吞掉异常：单次格式化失败不应该卡死后续请求
  locks.set(
    key,
    next.then(
      () => undefined,
      () => undefined,
    ),
  );
  return next;
}

/**
 * 加载 clang-format 与 gofmt 的 wasm 引擎。
 * 这两个引擎的加载器原本是给浏览器写的，默认会去 fetch 同目录的 .wasm；在 Node 下
 * 我们直接把 wasm 字节读出来传进去，绕过 file:// 的 fetch 限制。
 * 单个引擎加载失败不影响另一个，也不影响纯 JS 引擎——因此这里不抛异常，
 * 只把失败原因打到日志，并通过 engineStatus() 暴露出去。
 */
export async function initEngines() {
  try {
    const mod = await import(path.join(WASM_DIR, 'clang-format-web.js'));
    await mod.default(fs.readFileSync(path.join(WASM_DIR, 'clang-format.wasm')));
    engines.clang = mod;
  } catch (e) {
    console.error('[engine] clang-format 初始化失败:', describe(e));
  }

  try {
    const mod = await import(path.join(WASM_DIR, 'gofmt_web.js'));
    await mod.default(fs.readFileSync(path.join(WASM_DIR, 'gofmt.wasm')));
    engines.gofmt = mod;
  } catch (e) {
    console.error('[engine] gofmt 初始化失败:', describe(e));
  }

  initialized = true;
}

/**
 * 引擎状态快照，/api/health 直接返回该结构。
 * 保持 { ready, clang, gofmt } 的形状不变，前端据此提示缺失的引擎。
 */
export function engineStatus() {
  return { ready: initialized, clang: Boolean(engines.clang), gofmt: Boolean(engines.gofmt) };
}

function describe(e) {
  return e && e.message ? e.message : e;
}

/**
 * clang-format 靠「虚拟文件名」判定语言，因此每种语言要传对应的文件名。
 * @param {string} code
 * @param {{file: string, style: string, tabWidth: number, useTabs: boolean}} opts
 * @returns {string} 格式化结果
 */
export function formatWithClang(code, { file, style, tabWidth, useTabs }) {
  if (!engines.clang) throw new Error('clang-format 引擎未就绪');
  const options = JSON.stringify({ BasedOnStyle: style, IndentWidth: tabWidth, UseTab: useTabs });
  return withEngineLock('clang', () => engines.clang.format(code, file, options));
}

/**
 * gofmt 不接受风格参数，缩进固定为 tab。
 * @param {string} code
 * @returns {Promise<string>} 格式化结果
 */
export function formatWithGofmt(code) {
  if (!engines.gofmt) throw new Error('gofmt 引擎未就绪');
  return withEngineLock('gofmt', () => engines.gofmt.format(code));
}

/**
 * ruff 在 Node 下以 Workspace API 提供格式化，纯 wasm、无需系统装 Python。
 * 格式化失败时用 check() 取精确行列，挂到 error 上供前端高亮。
 * @param {string} code
 * @param {{tabWidth: number, useTabs: boolean}} opts
 * @returns {Promise<string>}
 */
export function formatWithRuff(code, { tabWidth, useTabs }) {
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

  return withEngineLock('ruff', () => {
    try {
      return ws.format(code);
    } catch (fe) {
      let line = null;
      let col = null;
      try {
        const diags = ws.check(code);
        if (Array.isArray(diags) && diags[0] && diags[0].start_location) {
          line = diags[0].start_location.row;
          col = diags[0].start_location.column;
        }
      } catch {
        // check() 也失败时忽略，退回由 describeError 从消息文本里解析行列
      }
      const err = new Error(fe && fe.message ? fe.message : String(fe));
      if (line != null) {
        err.line = line;
        err.col = col;
      }
      throw err;
    }
  });
}

/**
 * shfmt 只暴露空格式缩进（本包装未提供 tab 选项），故统一按 tabWidth 个空格缩进。
 * shell: 1 表示 bash 方言。
 * @param {string} code
 * @param {{tabWidth: number}} opts
 * @returns {Promise<string>}
 */
export function formatWithShfmt(code, { tabWidth }) {
  return withEngineLock('shfmt', () => shfmt.format(code, { indent: tabWidth, shell: 1 }));
}

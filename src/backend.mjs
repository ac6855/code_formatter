/**
 * 格式化后端的懒加载门面。
 *
 * 为什么不在 HTTP 层顶部直接 import formatter / engines：
 * 这两个模块会 import prettier、ruff、shfmt 等 npm 依赖。若用静态 import，
 * 一旦 node_modules 缺失或损坏，整个进程直接起不来——用户连页面都打不开，
 * 只能去翻容器日志。改成运行时动态加载后，最坏情况是页面正常打开、
 * 格式化接口返回 503 并附上明确原因，和重构前的降级行为一致，但更好排查。
 */

/** @type {typeof import('./formatter/index.mjs') | null} */
let formatter = null;

/** @type {typeof import('./formatter/engines.mjs') | null} */
let enginesModule = null;

/** 加载失败的简短原因；加载成功为 null。 */
let loadError = null;

let loaded = false;

/** 兜底的状态结构，形状与 engines.engineStatus() 一致。 */
const NO_ENGINES = { ready: false, clang: false, gofmt: false };

function describe(e) {
  return e && e.message ? e.message : String(e);
}

/**
 * 加载格式化引擎。可重复调用，已加载则直接返回。
 * 不抛异常：失败原因记录在状态里，由 /api/health 与 /api/format 反馈给用户。
 */
export async function loadBackend() {
  if (loaded) return;

  try {
    enginesModule = await import('./formatter/engines.mjs');
    await enginesModule.initEngines();
    formatter = await import('./formatter/index.mjs');
    loaded = true;
    loadError = null;
  } catch (e) {
    loaded = false;
    formatter = null;
    // 依赖缺失是最常见的失败原因，单独给出可操作的提示
    const raw = describe(e);
    loadError = /Cannot find (module|package)/i.test(raw) ? `${raw}（请先在服务端执行 npm install）` : raw;
  }
}

/** 后端是否已就绪。 */
export function isReady() {
  return loaded;
}

/** 健康检查用的状态快照。 */
export function backendStatus() {
  return {
    ready: loaded,
    error: loadError,
    engines: loaded && enginesModule ? enginesModule.engineStatus() : NO_ENGINES,
  };
}

/**
 * 转发到格式化实现。
 * @throws {Error} 后端未就绪时抛出，供 HTTP 层转成 503
 */
export function format(params) {
  if (!loaded || !formatter) {
    throw new Error(loadError || '后端引擎尚未就绪');
  }
  return formatter.format(params);
}

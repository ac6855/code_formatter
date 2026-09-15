/**
 * 后端接口调用。
 */

/**
 * 请求后端格式化。
 * 约定：无论何种失败都抛 Error，由调用方统一加「请求后端失败：」前缀展示，
 * 保持与重构前一致的提示风格。
 *
 * @param {{lang: string, code: string, action: string, tabWidth: number, useTabs: boolean}} params
 * @returns {Promise<{ok: true, result: string} | {ok: false, error: string, line?: number|null, col?: number|null}>}
 */
export async function requestFormat({ lang, code, action, tabWidth, useTabs }) {
  const resp = await fetch('/api/format', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lang, code, action, tabWidth, useTabs }),
  });

  const text = await resp.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('后端返回内容为空或非 JSON（请确认服务端已启动、且 node_modules 已安装）');
  }

  if (!resp.ok) {
    throw new Error('后端返回 HTTP ' + resp.status + (data && data.error ? '：' + data.error : ''));
  }
  if (!data || typeof data !== 'object') {
    throw new Error('后端返回格式异常');
  }
  return data;
}

/**
 * 探测后端健康状态。
 * 页面能打开只说明静态资源可达，不代表后端进程与引擎真的就绪，
 * 因此需要用一次真实请求来确定状态。
 * @returns {Promise<{ok: boolean, backendReady: boolean, engines: object, error?: string}>}
 */
export async function fetchHealth() {
  const resp = await fetch('/api/health');
  if (!resp.ok) throw new Error('HTTP ' + resp.status);
  return resp.json();
}

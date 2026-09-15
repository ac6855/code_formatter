/**
 * 界面输出与表单取值。
 * 所有直接读写 DOM 的地方都收在这里，其余模块只调本模块的函数，
 * 避免 DOM 操作散落在各处。
 */

function el(id) {
  return document.getElementById(id);
}

/**
 * 输出区状态文字。
 * @param {string} message
 * @param {boolean} [isError]
 */
export function setStatus(message, isError) {
  const node = el('status');
  node.textContent = message || '';
  node.className = 'status' + (isError ? ' err' : '');
}

/**
 * 顶栏后端健康状态胶囊。
 * @param {string} message
 * @param {boolean} [isError]
 */
export function setEngineStatus(message, isError) {
  const node = el('engineStatus');
  node.textContent = message || '';
  node.className = 'status-pill' + (isError ? ' err' : '');
}

/**
 * 输出区的行数 / 字符数信息。
 * @param {string} text
 */
export function setLineInfo(text) {
  const node = el('lineInfo');
  if (!text) {
    node.textContent = '';
    return;
  }
  const lines = text.split('\n').length;
  node.textContent = `${lines} 行 · ${text.length} 字符`;
}

/** @returns {string} 当前选中的语言 id */
export function readLanguage() {
  return el('lang').value;
}

/**
 * 读取缩进选项。
 * 「Tab」在下拉里的值是 0，需要转成 useTabs —— 后端只认 useTabs + tabWidth 两个字段。
 * @returns {{tabWidth: number, useTabs: boolean}}
 */
export function readIndent() {
  const value = el('indent').value;
  if (value === '0') return { useTabs: true, tabWidth: 2 };
  return { useTabs: false, tabWidth: parseInt(value, 10) };
}

/** @returns {string} 换行模式：off | on | bounded */
export function readWrap() {
  return el('wrap').value;
}

/**
 * 应用亮/暗主题到文档层（背景、按钮文案）。
 * Monaco 编辑器本身的主题由 editor 模块负责。
 * @param {boolean} isDark
 */
export function applyDocumentTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  el('themeBtn').textContent = isDark ? '☀️ 亮色' : '🌓 暗色';
}

/**
 * 设置「压缩」按钮可用性。
 * 只有注册表里声明了 minify 的语言才提供压缩，其余语言点压缩等于格式化，容易误导用户。
 * @param {{canMinify: boolean, label: string}} language
 */
export function setMinifyAvailability(language) {
  const btn = el('minifyBtn');
  btn.disabled = !language.canMinify;
  btn.title = language.canMinify ? `压缩 ${language.label}` : `${language.label} 不支持压缩`;
}

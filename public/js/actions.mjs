/**
 * 用户动作：格式化 / 压缩 / 示例 / 清空 / 复制 / 粘贴 / 下载 / 主题切换 / 后端健康探测。
 * 这里是前端唯一「编排」的地方——串联 ui（取输入、写输出）、editor（编辑器操作）与 api（后端调用）。
 */
import { ACTION_FORMAT, ACTION_MINIFY } from '/shared/languages.mjs';

import { fetchHealth, requestFormat } from './api.mjs';
import * as editor from './editor.mjs';
import { LANGUAGE_BY_ID } from './languages.mjs';
import * as ui from './ui.mjs';

/** 上一次载入过示例的语言。用于判断输入区内容是否还是「上一门语言的示例」，从而决定切换语言时是否覆盖。 */
let lastSampleLanguageId = 'javascript';

/** 当前是否暗色主题。 */
let isDarkTheme = false;

/**
 * 执行格式化或压缩。
 * @param {string} action ACTION_FORMAT | ACTION_MINIFY
 */
export async function runFormat(action = ACTION_FORMAT) {
  const langId = ui.readLanguage();
  const language = LANGUAGE_BY_ID.get(langId);

  // 未接入后端的语言在前端直接拦截，省掉一次必然失败的请求
  if (language && language.unsupported) {
    ui.setStatus(language.unsupported, true);
    return;
  }

  const code = editor.getInputValue();
  if (!code.trim()) {
    ui.setStatus('请输入代码', true);
    return;
  }

  editor.clearErrorLine();
  ui.setStatus('正在格式化…');

  try {
    const { tabWidth, useTabs } = ui.readIndent();
    const data = await requestFormat({ lang: langId, code, action, tabWidth, useTabs });

    if (!data.ok) {
      ui.setStatus(data.error || '格式化失败', true);
      if (data.line != null) editor.focusErrorLine(data.line);
      return;
    }

    editor.setOutputValue(data.result);
    ui.setLineInfo(data.result);
    ui.setStatus(action === ACTION_MINIFY ? '压缩完成' : '格式化完成');
  } catch (e) {
    ui.setStatus('请求后端失败：' + (e && e.message ? e.message : e), true);
  }
}

/**
 * 载入指定语言（默认当前语言）的示例代码。
 * @param {string} [langId]
 */
export function loadSample(langId = ui.readLanguage()) {
  const language = LANGUAGE_BY_ID.get(langId);
  editor.setInputValue(language ? language.sample : '');
  lastSampleLanguageId = langId;
  ui.setStatus('已载入示例');
}

/**
 * 切换语言：更新语法高亮。
 * 只有当输入区为空、或内容仍是上一门语言的示例时才自动载入新示例，
 * 避免覆盖用户已经输入或粘贴的代码。
 * @param {string} langId
 */
export function handleLanguageChange(langId) {
  const language = LANGUAGE_BY_ID.get(langId);
  editor.setModelLanguage(language ? language.monaco : 'plaintext');

  const current = editor.getInputValue();
  const previousSample = LANGUAGE_BY_ID.get(lastSampleLanguageId)?.sample;

  if (!current.trim() || current === previousSample) {
    loadSample(langId);
    ui.setStatus(`已切换至 ${langId} · 已载入示例`);
  } else {
    lastSampleLanguageId = langId;
    ui.setStatus(`已切换至 ${langId}`);
  }

  editor.setOutputValue('');
  ui.setLineInfo('');
  if (language) ui.setMinifyAvailability(language);
}

/** 清空输入、输出与状态。 */
export function clearAll() {
  editor.setInputValue('');
  editor.setOutputValue('');
  ui.setLineInfo('');
  ui.setStatus('');
  // 记下当前语言，这样紧接着点「示例」会被视为载入当前语言的示例
  lastSampleLanguageId = ui.readLanguage();
}

/** 复制输出区内容到剪贴板。 */
export async function copyOutput() {
  try {
    await navigator.clipboard.writeText(editor.getOutputValue());
    ui.setStatus('已复制');
  } catch {
    ui.setStatus('复制失败，请手动选择', true);
  }
}

/** 把剪贴板内容粘贴到输入区。 */
export async function pasteIntoInput() {
  try {
    const text = await navigator.clipboard.readText();
    if (text != null) {
      editor.setInputValue(text);
      ui.setStatus('已粘贴到输入');
    }
  } catch {
    ui.setStatus('粘贴失败（浏览器可能限制了剪贴板读取权限）', true);
  }
}

/** 把输出区内容下载为文件，扩展名取自当前语言。 */
export function downloadOutput() {
  const text = editor.getOutputValue();
  if (!text) {
    ui.setStatus('无内容可下载', true);
    return;
  }

  const language = LANGUAGE_BY_ID.get(ui.readLanguage());
  const ext = (language && language.ext) || 'txt';

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'formatted.' + ext;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);

  ui.setStatus('已下载 formatted.' + ext);
}

/** 切换亮 / 暗主题（同时作用于文档与 Monaco 编辑器）。 */
export function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  ui.applyDocumentTheme(isDarkTheme);
  editor.applyEditorTheme(isDarkTheme);
}

/**
 * 探测后端健康状态。
 * 区分三种情况：真的连上了 / 后端在但引擎没加载上 / 完全连不上。
 */
export async function checkBackendHealth() {
  try {
    const data = await fetchHealth();
    if (data.ok && data.backendReady) {
      const engines = data.engines || {};
      const missing = [];
      if (!engines.clang) missing.push('clang-format');
      if (!engines.gofmt) missing.push('gofmt');

      if (missing.length) {
        ui.setEngineStatus(`后端已连接 · 引擎缺失(${missing.join('/')})`, true);
      } else {
        ui.setEngineStatus('后端已连接 ✓', false);
      }
    } else {
      ui.setEngineStatus('后端已就绪 · 引擎未加载', true);
    }
  } catch {
    ui.setEngineStatus('后端未连接 ✗', true);
  }
}

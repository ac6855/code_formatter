/**
 * 装配入口：构建语言下拉、创建编辑器、绑定事件。
 */
import { ACTION_FORMAT, ACTION_MINIFY } from '/shared/languages.mjs';

import * as actions from './actions.mjs';
import * as editor from './editor.mjs';
import { DEFAULT_LANGUAGE_ID, LANGUAGES } from './languages.mjs';
import * as ui from './ui.mjs';

/**
 * 按注册表生成语言下拉。
 * 分组顺序沿用注册表里 group 首次出现的顺序，因此新增语言只需改 shared/languages.mjs，
 * 不必再手工维护 index.html 里的 <option> 列表。
 * @param {HTMLSelectElement} select
 */
function buildLanguageSelect(select) {
  const groups = new Map();

  for (const language of LANGUAGES) {
    let optgroup = groups.get(language.group);
    if (!optgroup) {
      optgroup = document.createElement('optgroup');
      optgroup.label = language.group;
      groups.set(language.group, optgroup);
      select.appendChild(optgroup);
    }

    const option = document.createElement('option');
    option.value = language.id;
    option.textContent = language.label;
    optgroup.appendChild(option);
  }

  select.value = DEFAULT_LANGUAGE_ID;
}

function bindEvents() {
  document
    .getElementById('lang')
    .addEventListener('change', (e) => actions.handleLanguageChange(e.target.value));

  document.getElementById('wrap').addEventListener('change', (e) => editor.applyWordWrap(e.target.value));
  // 缩进不影响已有内容，下次格式化时由 runFormat 读取，因此无需即时响应

  document.getElementById('formatBtn').addEventListener('click', () => actions.runFormat(ACTION_FORMAT));
  document.getElementById('minifyBtn').addEventListener('click', () => actions.runFormat(ACTION_MINIFY));
  document.getElementById('sampleBtn').addEventListener('click', () => actions.loadSample());
  document.getElementById('clearBtn').addEventListener('click', () => actions.clearAll());
  document.getElementById('copyBtn').addEventListener('click', () => actions.copyOutput());
  document.getElementById('pasteBtn').addEventListener('click', () => actions.pasteIntoInput());
  document.getElementById('downloadBtn').addEventListener('click', () => actions.downloadOutput());
  document.getElementById('themeBtn').addEventListener('click', () => actions.toggleTheme());

  editor.bindFormatShortcut(() => actions.runFormat(ACTION_FORMAT));

  // Ctrl/⌘ + S 下载结果，同时阻止浏览器自带的「保存网页」
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      actions.downloadOutput();
    }
  });
}

async function main() {
  const select = document.getElementById('lang');
  buildLanguageSelect(select);

  const initial = LANGUAGES.find((l) => l.id === DEFAULT_LANGUAGE_ID);

  await editor.initEditors({
    inputElement: document.getElementById('editor'),
    outputElement: document.getElementById('output'),
    initialValue: initial.sample,
    language: initial.monaco,
  });

  // 与「换行」下拉的默认值保持一致
  editor.applyWordWrap(ui.readWrap());
  ui.setMinifyAvailability(initial);

  bindEvents();

  actions.checkBackendHealth();
}

main().catch((e) => {
  // 编辑器加载失败等致命问题，至少让用户看到原因而不是空白页面
  ui.setStatus('初始化失败：' + (e && e.message ? e.message : e), true);
  console.error('[init]', e);
});

/**
 * 编辑器实例的创建与编辑器级操作（语言、换行、主题、错误行高亮）。
 * 界面状态文字不在这里，那是 ui 模块的职责。
 */
import { installMonacoEnvironment, loadMonaco } from './monaco.mjs';

/** 两个编辑器共用的基础配置。 */
const BASE_OPTIONS = {
  automaticLayout: true,
  fontSize: 13,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  fontLigatures: true,
  renderWhitespace: 'selection',
  tabSize: 2,
};

let monaco = null;
let inputEditor = null;
let outputEditor = null;
let errorDecorations = null;

/**
 * 加载 Monaco 并创建输入 / 输出两个编辑器。
 * @param {{inputElement: HTMLElement, outputElement: HTMLElement, initialValue: string, language: string}} opts
 */
export async function initEditors({ inputElement, outputElement, initialValue, language }) {
  installMonacoEnvironment();
  monaco = await loadMonaco();

  inputEditor = monaco.editor.create(inputElement, {
    ...BASE_OPTIONS,
    value: initialValue,
    language,
  });
  outputEditor = monaco.editor.create(outputElement, {
    ...BASE_OPTIONS,
    language,
  });
}

/** @returns {string} 输入区内容 */
export function getInputValue() {
  return inputEditor.getValue();
}

/** @param {string} text */
export function setInputValue(text) {
  inputEditor.setValue(text);
}

/** @returns {string} 输出区内容 */
export function getOutputValue() {
  return outputEditor.getValue();
}

/** @param {string} text */
export function setOutputValue(text) {
  outputEditor.setValue(text);
}

/**
 * 切换两个编辑器的语法高亮语言。
 * @param {string} monacoLanguage Monaco 的语言 id（注意与我们的语言 id 并不总是一致，如 bash -> shell）
 */
export function setModelLanguage(monacoLanguage) {
  const target = monacoLanguage || 'plaintext';
  monaco.editor.setModelLanguage(inputEditor.getModel(), target);
  monaco.editor.setModelLanguage(outputEditor.getModel(), target);
}

/**
 * 应用换行模式。
 * @param {string} mode off | on | bounded
 */
export function applyWordWrap(mode) {
  const options = { wordWrap: mode };
  if (mode === 'bounded') options.wordWrapColumn = 120;
  inputEditor.updateOptions(options);
  outputEditor.updateOptions(options);
}

/**
 * 切换 Monaco 主题。
 * @param {boolean} isDark
 */
export function applyEditorTheme(isDark) {
  monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs');
}

/** 清空错误行高亮。 */
export function clearErrorLine() {
  if (errorDecorations) {
    try {
      errorDecorations.clear();
    } catch {
      // 编辑器已销毁等情况下忽略
    }
    errorDecorations = null;
  }
}

/**
 * 高亮出错行，并把光标移过去。
 * @param {number} line
 */
export function focusErrorLine(line) {
  clearErrorLine();
  if (!inputEditor || !inputEditor.createDecorationsCollection) return;

  errorDecorations = inputEditor.createDecorationsCollection([
    {
      range: new monaco.Range(line, 1, line, 1),
      options: {
        isWholeLine: true,
        className: 'fmt-error-line',
        glyphMarginClassName: 'fmt-error-glyph',
      },
    },
  ]);

  inputEditor.revealLineInCenter(line);
  inputEditor.setPosition({ lineNumber: line, column: 1 });
  inputEditor.focus();
}

/**
 * 注册 Ctrl/⌘ + Enter 格式化快捷键。
 * 用 Monaco 官方的 addCommand 而非监听 onKeyDown：前者跨平台且编辑器聚焦即触发，
 * 后者在回调里读 e.key 并不可靠。
 * @param {() => void} handler
 */
export function bindFormatShortcut(handler) {
  const keybinding = monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter;
  inputEditor.addCommand(keybinding, handler);
  outputEditor.addCommand(keybinding, handler);
}

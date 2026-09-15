/**
 * Monaco 的运行环境配置与加载。
 */

/**
 * 安装 MonacoEnvironment。
 *
 * 这里用「内联空 worker」顶替语言服务 worker，是本项目有意为之：
 * Monaco 创建 worker 时优先调用 MonacoEnvironment.getWorker
 * （见 vs/editor/editor.main.js 的 createWebWorker 实现），因此
 * vs/language/*&#47;*Worker.js 永远不会被请求——省掉约 7MB 下载。
 * 本来也不需要它们：本工具的格式化完全由后端完成，前端只用 Monaco 做
 * 编辑与语法高亮，而高亮靠前端分词器、不依赖 worker。
 */
export function installMonacoEnvironment() {
  globalThis.MonacoEnvironment = {
    getWorker() {
      const blob = new Blob(['self.onmessage=function(){};'], { type: 'application/javascript' });
      return new Worker(URL.createObjectURL(blob));
    },
  };
}

/**
 * 通过 Monaco 自带的 AMD 加载器加载编辑器主模块。
 * vs/loader.js 已在 index.html 里以经典脚本先行加载，故此处 globalThis.require 必然存在。
 * @returns {Promise<typeof import('monaco-editor')>} monaco 命名空间
 */
export function loadMonaco() {
  return new Promise((resolve) => {
    const requirejs = globalThis.require;
    requirejs.config({ paths: { vs: './vs' } });
    requirejs(['vs/editor/editor.main'], () => resolve(globalThis.monaco));
  });
}

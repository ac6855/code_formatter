/**
 * 统一格式化入口：把 (语言, 动作, 缩进) 分派到对应引擎，并统一返回值形状。
 *
 * 语言到引擎的映射不在这里硬编码，而是读 shared/languages.mjs 的注册表，
 * 因此新增语言只改注册表、不用动这个文件。
 *
 * 返回约定（前端依赖该形状）：
 *   成功 { ok: true, result: string }
 *   失败 { ok: false, error: string, line: number|null, col: number|null }
 * 注意：任何失败都不抛出异常，而是折叠进返回值——这样单个请求出错不会
 * 影响 HTTP 层的状态码与连接管理。
 */
import prettier from 'prettier';
import { format as sqlFormat } from 'sql-formatter';
import { minify as terserMinify } from 'terser';
import XmlFormatter from 'xml-formatter';

import { ACTION_MINIFY, LANGUAGE_BY_ID } from '../../shared/languages.mjs';
import { describeError } from './errors.mjs';
import { formatWithClang, formatWithGofmt, formatWithRuff, formatWithShfmt } from './engines.mjs';

// —— 压缩实现 ——
// 只有注册表里声明了 minify 的语言会走到这里，其余语言点「压缩」等同于「格式化」。
const MINIFIERS = {
  async terser(code) {
    return (await terserMinify(code, { compress: true, mangle: true })).code;
  },
  json(code) {
    return JSON.stringify(JSON.parse(code));
  },
  sql(code) {
    // sql-formatter 没有专门的压缩模式，这里用 0 宽缩进 + 收敛空白实现
    return sqlFormat(code, { language: 'sql', tabWidth: 0 }).replace(/\s+/g, ' ').trim() + '\n';
  },
  xml(code) {
    return code.replace(/>\s*</g, '><').trim() + '\n';
  },
};

// —— 格式化实现 ——
// 签名统一为 (code, spec, opts)，spec 即注册表条目。
const FORMATTERS = {
  prettier(code, spec, { tabWidth, useTabs }) {
    return prettier.format(code, { parser: spec.parser, tabWidth, useTabs });
  },
  sql(code, spec, { tabWidth }) {
    return sqlFormat(code, { language: 'sql', tabWidth, keywordCase: 'upper' });
  },
  xml(code, spec, { tabWidth, useTabs }) {
    const indentation = useTabs ? '\t' : ' '.repeat(tabWidth);
    return XmlFormatter(code, { indentation, collapseContent: false, lineSeparator: '\n' });
  },
  clang(code, spec, { tabWidth, useTabs }) {
    return formatWithClang(code, {
      file: spec.clangFile,
      style: spec.clangStyle,
      tabWidth,
      useTabs,
    });
  },
  gofmt(code) {
    return formatWithGofmt(code);
  },
  ruff(code, spec, { tabWidth, useTabs }) {
    return formatWithRuff(code, { tabWidth, useTabs });
  },
  shfmt(code, spec, { tabWidth }) {
    return formatWithShfmt(code, { tabWidth });
  },
};

/**
 * 格式化一段代码。
 * @param {{lang: string, code: string, action?: string, tabWidth?: number, useTabs?: boolean}} param
 * @returns {Promise<{ok: true, result: string} | {ok: false, error: string, line: number|null, col: number|null}>}
 */
export async function format({ lang, code, action = 'format', tabWidth = 2, useTabs = false }) {
  try {
    const spec = LANGUAGE_BY_ID.get(lang);
    if (!spec) throw new Error('该语言暂不支持');
    // 注册表里 engine 为空表示尚未接入（如 PHP），把注册表里的说明原样透出
    if (!spec.engine) throw new Error(spec.unsupported || '该语言暂不支持');

    const opts = { tabWidth, useTabs };
    const useMinify = action === ACTION_MINIFY && spec.minify;

    const result = useMinify
      ? await MINIFIERS[spec.minify](code)
      : await FORMATTERS[spec.engine](code, spec, opts);

    return { ok: true, result };
  } catch (e) {
    const { text, line, col } = describeError(e);
    return { ok: false, error: text, line, col };
  }
}

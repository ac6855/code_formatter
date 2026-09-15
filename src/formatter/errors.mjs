/**
 * 把各引擎五花八门的原始报错，翻译成统一的中文提示 + 可用于高亮的行列号。
 *
 * 各引擎的报错风格差异很大，这里是唯一的收口点：
 *   prettier   —— 带 loc.start.line/column 的结构化对象，消息里还夹着代码片段和插入符
 *   terser     —— 类似 prettier，但格式略有出入
 *   ruff       —— 消息形如 "... at byte range 18..19"
 *   shfmt      —— 前缀形如 "1:31: "
 *   clang/go   —— 前缀形如 "[error] " 或 "1:2: "
 * 输出统一为 { text, line, col }，text 形如「语法错误（第 3 行 · 第 5 列）：Unexpected token」。
 */

/**
 * @param {unknown} e 引擎抛出的原始异常
 * @returns {{text: string, line: number|null, col: number|null}}
 */
export function describeError(e) {
  const raw = e && e.message ? e.message : String(e == null ? '' : e);
  let line = null;
  let col = null;

  // 优先取结构化字段（prettier / terser 会挂在异常对象上）
  const obj = e && typeof e === 'object' ? e : null;
  if (obj) {
    const loc = obj.loc && (obj.loc.start || obj.loc);
    if (loc && typeof loc.line === 'number') {
      line = loc.line;
      col = loc.column != null ? loc.column : null;
    } else if (typeof obj.line === 'number') {
      line = obj.line;
      col = obj.col != null ? obj.col : null;
    }
  }

  // 退回到从消息文本里正则解析
  if (line == null) {
    const m =
      raw.match(/(\d+):(\d+)/) ||
      raw.match(/line\s+(\d+)[^\d]*column\s+(\d+)/i) ||
      raw.match(/(\d+)\s*,\s*column\s+(\d+)/i) ||
      raw.match(/line\s+(\d+)/i);
    if (m) {
      line = parseInt(m[1], 10);
      col = m[2] != null ? parseInt(m[2], 10) : null;
    }
  }
  if (line != null && line < 1) line = 1;

  // 剥掉各引擎的消息装饰：ansi 色码、位置前缀、代码片段、插入符
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

  // 按报错内容归类，给用户一个粗粒度的原因前缀
  let prefix = '格式化失败';
  if (/unexpected|expected|missing|mismatch|parse\s*error|syntax|can only be used to end/i.test(raw)) {
    prefix = '语法错误';
  } else if (/eof|end of (input|file)|unterminated|unexpected end/i.test(raw)) {
    prefix = '语法不完整';
  } else if (/indent|width|tab|option|invalid/i.test(raw)) {
    prefix = '配置无效';
  }

  const locText = line != null ? `（第 ${line} 行${col != null ? ' · 第 ' + col + ' 列' : ''}）` : '';
  return { text: `${prefix}${locText}：${msg}`, line, col };
}

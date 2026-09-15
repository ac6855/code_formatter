/**
 * 前端侧的语言视图。
 *
 * 语言清单的真正来源是 /shared/languages.mjs —— 前后端共用同一份注册表。
 * 这里只做两件事：转成前端视图（剥掉引擎实现细节），并建好按 id 查表的索引。
 * 浏览器与 Node 都能加载该文件，服务端在 /shared/ 前缀下托管它。
 */
import { toClientLanguages } from '/shared/languages.mjs';

/** 前端可见的语言字段：id / label / group / monaco / ext / sample / canMinify / unsupported。 */
export const LANGUAGES = toClientLanguages();

/** 按 id 索引，便于快速取示例、扩展名、是否支持压缩。 */
export const LANGUAGE_BY_ID = new Map(LANGUAGES.map((l) => [l.id, l]));

/** 首屏默认语言。 */
export const DEFAULT_LANGUAGE_ID = 'javascript';

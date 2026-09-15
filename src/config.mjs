/**
 * 服务端运行参数。
 */

/** 默认监听端口，可用环境变量 PORT 覆盖。 */
export const DEFAULT_PORT = 4317;

/** 监听地址：0.0.0.0 让本机 localhost、局域网、容器与反向代理都能访问。 */
export const HOST = '0.0.0.0';

/** 请求体上限。代码格式化场景下 8MB 已远超正常用量，用于挡住异常大请求。 */
export const MAX_BODY_BYTES = 8 * 1024 * 1024;

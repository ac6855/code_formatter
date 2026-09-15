/**
 * 语言注册表 —— 全项目唯一事实来源。
 *
 * 重构前，同一门语言的元数据散落在 6 个地方，新增一种语言需要同步修改：
 *   1. index.html            下拉菜单的 <option> 与 optgroup
 *   2. app.js  MONACO_LANG   Monaco 高亮语言 id
 *   3. app.js  SAMPLES       示例代码
 *   4. app.js  下载按钮      文件扩展名映射
 *   5. app.js  UNSUPPORTED   未接入语言的提示文案
 *   6. format-backend.mjs    switch 分支 + CLANG_LANG_FILE + CLANG_PRESET
 * 现在只需要在下面的 LANGUAGES 里加一项：前端下拉、示例、高亮、
 * 下载扩展名、压缩按钮可用性，以及后端的引擎分派都会自动跟上。
 *
 * 该文件同时被浏览器（前端）与 Node（后端）import，因此：
 *   - 只允许使用双方都支持的 ESM 语法；
 *   - 不要在此 import 任何 Node 内置模块，否则前端会加载失败。
 */

/** 动作类型：格式化 / 压缩。 */
export const ACTION_FORMAT = 'format';
export const ACTION_MINIFY = 'minify';

/**
 * 语言清单。数组顺序即为前端下拉菜单的显示顺序，
 * group 首次出现的顺序即为 optgroup 的顺序。
 *
 * 字段说明：
 *   id          前后端统一使用的语言标识，也是 /api/format 的 lang 参数
 *   label       下拉菜单显示名
 *   group       下拉菜单分组名
 *   monaco      Monaco 编辑器的语言 id（与 id 不完全一致，如 bash -> shell）
 *   ext         下载结果时的文件扩展名
 *   sample      示例代码（点「示例」按钮载入）
 *   engine      格式化引擎：prettier | sql | xml | clang | gofmt | ruff | shfmt
 *   parser      engine 为 prettier 时传给 prettier 的 parser 名
 *   clangFile   engine 为 clang 时的虚拟文件名 —— clang-format 靠文件名判定语言
 *   clangStyle  engine 为 clang 时的预设风格（BasedOnStyle）
 *   minify      压缩实现：terser | json | sql | xml；缺省表示该语言不支持压缩
 *   unsupported 未接入时给用户的提示；有值则前端直接拦截，不发请求
 */
export const LANGUAGES = [
  // —— 前端 / Web ——
  {
    id: 'javascript',
    label: 'JavaScript',
    group: '前端 / Web',
    monaco: 'javascript',
    ext: 'js',
    sample: 'const x={a:1,b:2};function   foo(bar){return bar&&true?1:0}',
    engine: 'prettier',
    parser: 'babel',
    minify: 'terser',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    group: '前端 / Web',
    monaco: 'typescript',
    ext: 'ts',
    sample: "interface User{id:number;name:string}const u:User={id:1,name:'a'}",
    engine: 'prettier',
    parser: 'typescript',
  },
  {
    id: 'html',
    label: 'HTML',
    group: '前端 / Web',
    monaco: 'html',
    ext: 'html',
    sample: '<div><p class="x">hello</p><span>world</span></div>',
    engine: 'prettier',
    parser: 'html',
  },
  {
    id: 'css',
    label: 'CSS',
    group: '前端 / Web',
    monaco: 'css',
    ext: 'css',
    sample: 'a{color:red;background:#fff}@media screen{.b{margin:0}}',
    engine: 'prettier',
    parser: 'css',
  },
  {
    id: 'scss',
    label: 'SCSS',
    group: '前端 / Web',
    monaco: 'scss',
    ext: 'scss',
    sample: '.card{color:red;.badge{margin:0;padding:4px}}',
    engine: 'prettier',
    parser: 'scss',
  },
  {
    id: 'less',
    label: 'LESS',
    group: '前端 / Web',
    monaco: 'less',
    ext: 'less',
    sample: '.card{color:red;.badge{margin:0;padding:4px}}',
    engine: 'prettier',
    parser: 'less',
  },
  {
    id: 'json',
    label: 'JSON',
    group: '前端 / Web',
    monaco: 'json',
    ext: 'json',
    sample: '{"name":"demo","nested":{"a":1,"b":[1,2,3]},"ok":true}',
    engine: 'prettier',
    parser: 'json',
    minify: 'json',
  },
  {
    id: 'yaml',
    label: 'YAML',
    group: '前端 / Web',
    monaco: 'yaml',
    ext: 'yaml',
    sample: 'name: demo\nversion: 1.0\ndeps:\n  - a\n  - b\nmeta: {x: 1, y: 2}',
    engine: 'prettier',
    parser: 'yaml',
  },
  {
    id: 'markdown',
    label: 'Markdown',
    group: '前端 / Web',
    monaco: 'markdown',
    ext: 'md',
    sample: '# Title\n\n## Sub\n\n- one\n- two\n\n```js\nconst a=1\n```',
    engine: 'prettier',
    parser: 'markdown',
  },

  // —— 数据 / 查询 ——
  {
    id: 'sql',
    label: 'SQL',
    group: '数据 / 查询',
    monaco: 'sql',
    ext: 'sql',
    sample: 'select id,name from users where age>18 order by name desc limit 10',
    engine: 'sql',
    minify: 'sql',
  },
  {
    id: 'xml',
    label: 'XML',
    group: '数据 / 查询',
    monaco: 'xml',
    ext: 'xml',
    sample: '<root><item id="1"><name>demo</name></item><item id="2"><name>test</name></item></root>',
    engine: 'xml',
    minify: 'xml',
  },

  // —— 系统 / 编译型 ——
  {
    id: 'c',
    label: 'C',
    group: '系统 / 编译型',
    monaco: 'c',
    ext: 'c',
    sample: 'int main(){int x=1;if(x){printf("hi");}return 0;}',
    engine: 'clang',
    clangFile: 'a.c',
    clangStyle: 'LLVM',
  },
  {
    id: 'cpp',
    label: 'C++',
    group: '系统 / 编译型',
    monaco: 'cpp',
    ext: 'cpp',
    sample: 'template<class T>class A{public:void f(T t){std::cout<<t;}};int main(){A<int>a;a.f(1);}',
    engine: 'clang',
    clangFile: 'a.cpp',
    clangStyle: 'LLVM',
  },
  {
    id: 'csharp',
    label: 'C#',
    group: '系统 / 编译型',
    monaco: 'csharp',
    ext: 'cs',
    sample: 'class C{public int X{get;set;}void M(){if(X>0){System.Console.WriteLine(X);}}}',
    engine: 'clang',
    clangFile: 'a.cs',
    clangStyle: 'Microsoft',
  },
  {
    id: 'java',
    label: 'Java',
    group: '系统 / 编译型',
    monaco: 'java',
    ext: 'java',
    sample: 'public class  T{public static void main(String[]a){if(true){int x=1;System.out.println(x);}}}',
    engine: 'clang',
    clangFile: 'A.java',
    clangStyle: 'Google',
  },
  {
    id: 'objc',
    label: 'Objective-C',
    group: '系统 / 编译型',
    monaco: 'objective-c',
    ext: 'm',
    sample: '@interface A:NSObject{int x;}@end@implementation A-(void)m{if(x>0){NSLog(@"%d",x);}}@end',
    engine: 'clang',
    clangFile: 'a.m',
    clangStyle: 'WebKit',
  },
  {
    id: 'go',
    label: 'Go',
    group: '系统 / 编译型',
    monaco: 'go',
    ext: 'go',
    sample: 'package main\nimport "fmt"\nfunc main(){x:=1;if x>0{fmt.Println(x)}}',
    engine: 'gofmt',
  },

  // —— 脚本语言 ——
  {
    id: 'python',
    label: 'Python',
    group: '脚本语言',
    monaco: 'python',
    ext: 'py',
    sample: 'def foo( x,y ):\n    if x:\n        return x+y\n    else:\n        return y',
    engine: 'ruff',
  },
  {
    id: 'bash',
    label: 'Bash / Shell',
    group: '脚本语言',
    monaco: 'shell',
    ext: 'sh',
    sample: 'if [ $x -gt 0 ]; then echo hi; fi',
    engine: 'shfmt',
  },
  {
    id: 'php',
    label: 'PHP',
    group: '脚本语言',
    monaco: 'php',
    ext: 'php',
    sample: '<?php function foo($a){return $a?1:0;} $x=array(1,2,3);',
    engine: null,
    unsupported: 'PHP 后端格式化暂未接入（需 @prettier/plugin-php），后续版本支持',
  },

  // —— 协议定义 (IDL) ——
  {
    id: 'proto',
    label: 'Protocol Buffers',
    group: '协议定义 (IDL)',
    ext: 'proto',
    sample: 'syntax="proto3";message User{string name=1;int32 id=2;repeated string tags=3;}',
    // Monaco 里 Protocol Buffers 的语言 id 是 proto（不是 protobuf，后者只是别名）。
    // 重构前 MONACO_LANG 漏了 proto 键，导致 .proto 一直按纯文本高亮。
    monaco: 'proto',
    engine: 'clang',
    clangFile: 'a.proto',
    clangStyle: 'Google',
  },

  // —— 硬件描述 (HDL) ——
  {
    id: 'verilog',
    label: 'Verilog',
    group: '硬件描述 (HDL)',
    monaco: 'verilog',
    ext: 'v',
    sample: 'module top(input clk,output reg q);always@(posedge clk)begin q<=~q;end endmodule',
    engine: 'clang',
    clangFile: 'a.v',
    clangStyle: 'LLVM',
  },
];

/** 按 id 快速查找。 */
export const LANGUAGE_BY_ID = new Map(LANGUAGES.map((l) => [l.id, l]));

/**
 * 前端视图：剥掉 clangFile / clangStyle / engine 等后端细节，
 * 只下发渲染界面必需的字段，避免把引擎实现暴露给浏览器。
 */
export function toClientLanguages() {
  return LANGUAGES.map((l) => ({
    id: l.id,
    label: l.label,
    group: l.group,
    monaco: l.monaco,
    ext: l.ext,
    sample: l.sample,
    canMinify: Boolean(l.minify),
    unsupported: l.unsupported || null,
  }));
}

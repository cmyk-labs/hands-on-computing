// 所属章节：19-ES 模块
// 演示知识点：export *、默认导出重命名与命名空间再导出的公共入口
// 运行命令：node scripts/19-es-modules/reexport.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，经 reexport.mjs 列出全部转发接口
export * from "./math.mjs";
export { default as describe } from "./math.mjs";
export * as math from "./math.mjs";

// 所属章节：24-类型声明生成与包分发
// 演示知识点：.mts 显式 ESM 入口对主实现的再导出
// 运行命令：npm run build:24（工作目录 content/编程语言/typescript）
// 期望结果：生成 modern.mjs 与 modern.d.mts
export { greet } from "./index.js";
export type { GreetingOptions } from "./index.js";

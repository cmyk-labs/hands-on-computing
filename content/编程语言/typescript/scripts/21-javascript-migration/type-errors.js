// 所属章节：21-JavaScript 迁移与 JSDoc
// 演示知识点：JSDoc 检查下字符串参数、省略 unknown 参数与值类型查询反例
// 运行命令：npm run errors:21（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
import { total, keep } from "./legacy.js";
total("10"); // TS2345：string 不是 number。
keep(); // TS2554：TS 7 不因参数是 unknown 就允许省略。
const sample = { name: "笔" };
/** @type {sample} */ // TS2749：值查询应写 typeof sample。
const other = { name: "纸" };
export {};

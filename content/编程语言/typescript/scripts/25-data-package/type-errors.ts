// 所属章节：25-综合工程实践
// 演示知识点：mapValues 得到 number[] 不能赋给 string[] 的反例
// 运行命令：npm run errors:25（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
import { mapValues } from "./package/src/index.js";
// TS2322：映射得到 number[]，不能赋给 string[]。
const texts: string[] = mapValues([1], item => item + 1);

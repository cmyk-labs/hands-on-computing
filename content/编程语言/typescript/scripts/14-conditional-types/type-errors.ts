// 所属章节：14-条件类型与 infer
// 演示知识点：约束不满足、提取类型不符、分布式结果与 never 不能赋值的反例
// 运行命令：npm run errors:14（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
import type { Constrained, ElementOf, OneArray, KeepText } from "./main.js";
type MissingCode = Constrained<{ title: string }>; // 约束处就拒绝输入，不进入条件分支。
const wrongElement: ElementOf<readonly number[]> = "3"; // 提取的是 number。
const mixed: OneArray<string | number> = [1, "二"]; // 不符合 string[] 或 number[]。
const impossible: KeepText<never> = "有值"; // 结果为 never，不能赋普通值。
// 预期诊断包含：TS2741, TS2322。

// 所属章节：23-自动化测试与类型检查
// 演示知识点：字符串实参与多余 @ts-expect-error 指令的原始诊断
// 运行命令：npm run errors:23（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，含 TS2345 与 TS2578；不生成或执行 JavaScript
import { divide } from "./calculator.js";
divide("9", 3); // TS2345：字符串参数。
// @ts-expect-error TS2578：这里故意不产生类型错误，用来观察未使用指令。
divide(9, 3);

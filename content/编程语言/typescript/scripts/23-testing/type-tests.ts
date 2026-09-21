// 所属章节：23-自动化测试与类型检查
// 演示知识点：返回类型关系与 @ts-expect-error 的静态断言
// 运行命令：npm run check:23（工作目录 content/编程语言/typescript）
// 期望结果：类型检查正常退出
import { divide, divideAsync } from "./calculator.js";
const result: number = divide(9, 3);
const pending: Promise<number> = divideAsync(9, 3);
// @ts-expect-error 字符串不是数值参数；原始错误另由 errors:23 核对。
divide("9", 3);
void result;
void pending;

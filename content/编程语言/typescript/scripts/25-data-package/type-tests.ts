// 所属章节：25-综合工程实践
// 演示知识点：mapValues 泛型结果关系的静态断言
// 运行命令：npm run check:25（工作目录 content/编程语言/typescript）
// 期望结果：类型检查正常退出
import { mapValues, type Reading } from "./package/src/index.js";
const values: number[] = mapValues<Reading, number>([{ sensor: "a", value: 2 }], item => item.value);
// @ts-expect-error 回调返回 number，不能把结果当 string[]。
const texts: string[] = mapValues([1], item => item + 1);
void values;
void texts;

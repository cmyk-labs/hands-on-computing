// 所属章节：03-数组、元组与只读类型
// 演示知识点：元素类型不匹配、越界索引、元组位置颠倒、剩余元素后接可选元素与只读视图写入的类型错误反例
// 运行命令：npm run errors:03（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
export {};

const badScores: number[] = [1, "2"]; // 元素必须为 number，字符串不会自动转换。

const fixed: [string, number] = ["数组", 25];
const outside = fixed[2]; // 已知长度为 2，索引 2 不存在。
const reversed: [string, number] = [25, "数组"]; // 两个位置的类型均不匹配。

type InvalidTail = [...values: string[], count?: number]; // 剩余元素后不能接可选元素。

const values: number[] = [];
const unsafe: number = values[0]; // noUncheckedIndexedAccess 使结果包含 undefined。

const readonlyScores: readonly number[] = [1];
readonlyScores.push(2); // 只读数组接口没有 push。
const writableScores: number[] = readonlyScores; // 不能把只读数组交给可写数组类型。
const readonlyPair: readonly [string, number] = ["数组", 1];
readonlyPair[1] = 2; // 只读位置不能通过这个视图赋值。

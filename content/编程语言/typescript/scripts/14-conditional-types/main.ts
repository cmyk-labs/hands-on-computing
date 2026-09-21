// 所属章节：14-条件类型与 infer
// 演示知识点：条件分支选择、infer 提取数组元素与函数签名、分布式条件与 never、重载推断与递归条件类型
// 运行命令：npm run run:14（工作目录 content/编程语言/typescript）
// 期望结果：正常退出，各段预期输出与行内注释一致
export type Constrained<T extends { code: number }> = T["code"];
export type CodeOf<T> = T extends { code: number } ? T["code"] : "absent";
const present: CodeOf<{ code: 201 }> = 201;
const absent: CodeOf<{ title: string }> = "absent";
console.log(present, absent);
// 预期输出：201 absent

export type ElementOf<T> = T extends readonly (infer Item)[] ? Item : never;
export type ResultOf<T> = T extends (...args: infer Args) => infer Result ? Result : never;
type ArgsOf<T> = T extends (...args: infer Args) => unknown ? Args : never;
const element: ElementOf<readonly number[]> = 3;
function label(code: number, suffix: string) { return `${code}:${suffix}`; }
const args: ArgsOf<typeof label> = [7, "ok"];
const result: ResultOf<typeof label> = label(...args);
console.log(element, result);
// 预期输出：3 7:ok

export type OneArray<T> = T extends unknown ? T[] : never;
export type WholeArray<T> = [T] extends [unknown] ? T[] : never;
const single: OneArray<string | number> = [1, 2];
const mixed: WholeArray<string | number> = [1, "二"];
console.log(JSON.stringify(single), JSON.stringify(mixed));
// 预期输出：[1,2] [1,"二"]

export type KeepText<T> = T extends string ? T : never;
type IsNever<T> = [T] extends [never] ? true : false;
const word: KeepText<string | number> = "保留";
const empty: IsNever<KeepText<never>> = true;
console.log(word, empty);
// 预期输出：保留 true

export function flip(value: number): string;
export function flip(value: string): number;
export function flip(value: string | number): string | number;
export function flip(value: string | number): string | number {
  return typeof value === "number" ? String(value) : value.length;
}
const extracted: ResultOf<typeof flip> = 5;
const called: string = flip(2);
console.log(extracted, called);
// 预期输出：5 2

type Leaf<T> = T extends readonly (infer Item)[] ? Leaf<Item> : T;
const leaf: Leaf<readonly (readonly number[])[]> = 9;
console.log(leaf);
// 预期输出：9

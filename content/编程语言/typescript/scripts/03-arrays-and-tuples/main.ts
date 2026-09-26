// 所属章节：03-数组、元组与只读类型
// 演示知识点：数组元素类型与二维结构、元组具名/可选/剩余元素、noUncheckedIndexedAccess 索引检查与 readonly 只读视图
// 运行命令：npm run run:03（工作目录 content/编程语言/typescript）
// 期望结果：按正文顺序输出各示例值，与正文行内注释一致
export {};
const scores: number[] = [6, 9];
const moreScores: Array<number> = [3];
const rows: number[][] = [scores, moreScores];
const mixed: (string | number)[] = ["课时", 2];
let sum = 0;
for (const row of rows) {
  for (const score of row) sum += score;
}
console.log(sum, mixed.length); // 18 2

type Lesson = [title: string, minutes: number];
const lesson: Lesson = ["数组", 25];
const [name, duration] = lesson;
const renamed: [topic: string, length: number] = lesson;
console.log(name.toUpperCase(), duration, renamed[1]); // 数组 25 25

type Reading = [title: string, minutes?: number];
const short: Reading = ["类型"];
const [readingTitle, minutes = 10] = short;
const possibleLength: 1 | 2 = short.length;
type Tagged = [title: string, ...tags: string[]];
const tagged: Tagged = ["元组", "基础", "数据"];
const [taggedTitle, ...tags] = tagged;
const ending: [...labels: string[], count: number] = ["练习", 2];
console.log(readingTitle, minutes, possibleLength, taggedTitle, tags.join("/"), ending.length); // 类型 10 1 元组 基础/数据 2

const first = scores[0]; // number | undefined，即使当前字面量非空。
const absent = rows[4]?.[0]; // 行不存在时，安全返回 undefined。
const checked = first === undefined ? "缺失" : first.toFixed(1);
console.log(checked, absent, lesson[0]); // 6.0 undefined 数组

const item = { count: 1 };
const writable = [item];
const view: readonly { count: number }[] = writable;
writable.push({ count: 2 });
item.count += 1; // 两个数组视图中的首元素都引用 item。
const readonlyLesson: readonly [string, number] = lesson;
const names: ReadonlyArray<string> = ["甲", "乙"];
console.log(view.length, view[0]?.count, readonlyLesson[1], names.join(",")); // 2 2 25 甲,乙

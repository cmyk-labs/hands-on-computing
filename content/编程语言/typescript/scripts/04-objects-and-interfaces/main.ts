// 所属章节：04-对象类型、类型别名与接口
// 演示知识点：接口与类型别名、extends 继承与结构兼容、可选属性与 undefined 的区别、readonly 视图、索引签名、递归类型与多余属性
// 运行命令：npm run run:04（工作目录 content/编程语言/typescript）
// 期望结果：按正文顺序输出各示例值，与正文行内注释一致
export {};
interface Named { title: string; }
type NamedAlias = { title: string };
interface Lesson extends Named {
  minutes: number;
  summary(): string;
}
const lesson: Lesson = {
  title: "接口", minutes: 20,
  summary() { return this.title + ":" + this.minutes; },
};
const named: NamedAlias = lesson;
function titleOf(value: { title: string }): string { return value.title; }
console.log(titleOf(named), lesson.summary()); // 接口 接口:20

interface OptionalName { nickname?: string; }
interface PresentName { nickname: string | undefined; }
interface FlexibleName { nickname?: string | undefined; }
const omitted: OptionalName = {};
const present: PresentName = { nickname: undefined };
const flexible: FlexibleName = { nickname: undefined };
function displayName(value: OptionalName): string {
  return value.nickname === undefined ? "匿名" : value.nickname;
}
console.log(displayName(omitted), "nickname" in omitted, "nickname" in present, "nickname" in flexible); // 匿名 false true true

interface View {
  readonly id: number;
  readonly detail: { visits: number };
}
const mutable = { id: 1, detail: { visits: 0 } };
const view: View = mutable;
view.detail.visits += 1;
mutable.id = 2;
console.log(view.id, view.detail.visits); // 2 1

interface Counts {
  [name: string]: number;
  total: number;
}
const counts: Counts = { total: 3, types: 2 };
interface Labels {
  [index: number]: string;
  [key: string]: string | number;
  length: number;
}
const labels: Labels = { 0: "类型", length: 1 };
console.log(counts.total, counts["missing"] ?? 0, labels[0]); // 3 0 类型

type Topic = { title: string; children?: Topic[] };
function countTopics(topic: Topic): number {
  let count = 1;
  for (const child of topic.children ?? []) count += countTopics(child);
  return count;
}
const tree: Topic = { title: "语言", children: [{ title: "类型" }, { title: "函数" }] };
console.log(countTopics(tree)); // 3

interface Options { title: string; }
const detailed = { title: "对象", minutes: 12 };
const options: Options = detailed;
console.log(options.title, "minutes" in options); // 对象 true

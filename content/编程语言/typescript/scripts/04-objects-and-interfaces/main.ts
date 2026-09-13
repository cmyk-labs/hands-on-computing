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

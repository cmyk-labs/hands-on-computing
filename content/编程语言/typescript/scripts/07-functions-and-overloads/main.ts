export {};
type Formatter = (value: number) => string;
const format: Formatter = (amount) => amount.toFixed(1);
function apply(value: number, formatter: Formatter): string { return formatter(value); }
console.log(apply(2, format)); // 2.0

type Searcher = { label: string; (query: string): boolean };
function containsType(query: string): boolean { return query.includes("类型"); }
containsType.label = "检索";
const searcher: Searcher = containsType;
type Maker = new (title: string) => { title: string };
class Note {
  title: string;
  constructor(title: string) { this.title = title; }
}
function makeNote(creator: Maker): { title: string } { return new creator("函数"); }
console.log(searcher.label, searcher("类型系统"), makeNote(Note).title); // 检索 true 函数

function greeting(name: string, suffix?: string): string { return name + (suffix ?? "!"); }
function repeat(text: string, count = 2): string { return text.repeat(count); }
function tagged(prefix = "课", title: string): string { return prefix + title; }
console.log(greeting("林"), greeting("林", undefined), repeat("A", undefined), tagged(undefined, "函数")); // 林! 林! AA 课函数

function total(...values: number[]): number { return values.reduce((sum, value) => sum + value, 0); }
function label(...args: [title: string, minutes: number]): string { return args[0] + ":" + args[1]; }
const args: [string, number] = ["函数", 18];
function visit(callback: (value: string, index: number) => void): void { callback("TS", 0); }
const seen: string[] = [];
visit((value) => { seen.push(value); });
console.log(total(1, 2, 3), label(...args), seen.join(",")); // 6 函数:18 TS

function convert(value: string): number;
function convert(value: number): string;
function convert(value: string | number): number | string {
  return typeof value === "string" ? value.length : value.toFixed(0);
}
const length: number = convert("函数");
const digits: string = convert(12);
function size(value: string | readonly unknown[]): number { return value.length; }
console.log(length, digits, size([1, 2, 3])); // 2 12 3

function titleWithPrefix(this: { prefix: string }, title: string): string {
  return this.prefix + title;
}
const storage: number[] = [];
const sink: (value: number) => void = (value) => storage.push(value);
sink(3); // 返回值在这个静态视图下不可作为 number 使用。
console.log(titleWithPrefix.call({ prefix: "课程:" }, "函数"), storage.length); // 课程:函数 1

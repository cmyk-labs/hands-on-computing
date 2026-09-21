// 所属章节：12-类型操作符与索引访问类型
// 演示知识点：keyof、typeof、索引访问类型、数组与元组元素提取、泛型键与返回值对应的 readField
// 运行命令：npm run run:12（工作目录 content/编程语言/typescript）
// 期望结果：正常退出，各段预期输出与行内注释一致
export type Course = { title: string; hours: number };
type CourseKey = keyof Course;
const selected: CourseKey = "title";
const course: Course = { title: "类型练习", hours: 4 };
console.log(selected, course[selected]);
// 预期输出：title 类型练习

type NumericSlots = { [index: number]: string };
type NamedSlots = { [key: string]: string };
const index: keyof NumericSlots = 3;
const numericName: keyof NamedSlots = 3;
const slots: NamedSlots = { "3": "已占用" };
console.log(index, slots[numericName]);
// 预期输出：3 已占用

const defaults = { theme: "light", retries: 2 };
type Settings = typeof defaults;
const settings: Settings = { theme: "dark", retries: 3 };
console.log(typeof defaults, settings.theme, settings.retries);
// 预期输出：object dark 3

type Hours = Course["hours"];
type Cell = Course["title" | "hours"];
type AnyCell = Course[keyof Course];
const key = "hours";
const hours: Course[typeof key] = 6;
const cell: Cell = "进度";
const other: AnyCell = 8;
const duration: Hours = hours;
console.log(duration, cell, other);
// 预期输出：6 进度 8

const lessons = [{ title: "键", minutes: 15 }, { title: "索引", minutes: 20 }];
type Lesson = (typeof lessons)[number];
type Minutes = Lesson["minutes"];
const extra: Lesson = { title: "练习", minutes: 10 };
const minutes: Minutes = extra.minutes;
type Entry = readonly [string, number];
const first: Entry[0] = "练习";
const either: Entry[number] = 10;
console.log(first, minutes, either);
// 预期输出：练习 10 10

export function readField<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}
console.log(readField(course, "hours").toFixed(1));
console.log(readField(course, "title").length > 0);
// 预期输出：4.0
// 预期输出：true

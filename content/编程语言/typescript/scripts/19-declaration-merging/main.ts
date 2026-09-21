// 所属章节：19-声明合并与模块扩充
// 演示知识点：接口与重载合并、类、函数、枚举与命名空间合并、模块扩充与全局扩充
// 运行命令：npm run run:19（工作目录 content/编程语言/typescript）
// 期望结果：按正文顺序输出各示例值，与正文行内注释一致
interface Stamp { code: number }
const Stamp: Stamp = { code: 19 };
console.log(Stamp.code);
// 预期输出：19

interface Lesson { title: string }
interface Lesson { hours: number }
const lesson: Lesson = { title: "合并", hours: 2 };
console.log(lesson.title, lesson.hours);
// 预期输出：合并 2

interface Reader { read(value: string): string | number }
interface Reader { read(value: "count"): number }
function read(value: "count"): number;
function read(value: string): string | number;
function read(value: string): string | number {
  return value === "count" ? 3 : value;
}
const reader: Reader = { read };
const count: number = reader.read("count");
console.log(count, reader.read("title"));
// 预期输出：3 title

import { Gauge } from "./gauge.js";
import "./gauge-double.js";
import "./global-build.js";
console.log(new Gauge(4).double(), globalThis.chapter19Build);
globalThis.chapter19Build = undefined;
// 预期输出：8 local

class Card { constructor(public title: string) {} }
namespace Card { export const category = "note"; }
function tag(value: string) { return `${tag.prefix}${value}`; }
namespace tag { export const prefix = "#"; }
enum Phase { Ready = 1, Done = 2 }
namespace Phase { export function label(value: Phase) { return value === Phase.Ready ? "就绪" : "完成"; } }
console.log(new Card("卡片").title, Card.category, tag("学习"), Phase.label(Phase.Done));
// 预期输出：卡片 note #学习 完成

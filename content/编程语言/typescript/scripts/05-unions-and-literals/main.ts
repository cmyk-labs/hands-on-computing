export {};
function measure(value: string | readonly string[]): number { return value.length; }
function normalize(value: string | number): string {
  return typeof value === "string" ? value.trim() : value.toFixed(0);
}
console.log(measure(["甲", "乙"]), normalize(" TS "), normalize(3)); // 2 TS 3

type HasTitle = { title: string };
type Timed = { minutes: number };
type Lesson = HasTitle & Timed;
const lesson: Lesson = { title: "联合", minutes: 15 };
console.log(lesson.title, lesson.minutes); // 联合 15

type State = "idle" | "ready" | "failed";
type Level = 1 | 2 | 3;
function badge(state: State, level: Level): string { return state + ":" + level; }
type Result = { state: "ready"; total: number } | { state: "failed"; reason: string };
const result: Result = { state: "ready", total: 2 };
console.log(badge("idle", 1), result.total); // idle:1 2

let mode = "ready"; // string，可以稍后保存其他字符串。
const binding = "ready"; // 单一字面量类型。
const ordinary = { state: "ready" }; // state 为 string。
const tags = ["基础"];
const fixed = { state: "ready", position: [1, 2], tags } as const;
tags.push("实践");
const known: "ready" = fixed.state;
console.log(mode, binding, ordinary.state, known, fixed.tags.length); // ready ready ready ready 2

type Label = { text: string | [number, number] };
const annotated: Label = { text: "TS" };
const checked = { text: "TS" } satisfies Label;
const asserted = {} as Label; // 演示不可靠断言；不读取缺失成员的方法。
const setting = { state: "ready", level: 2 } as const satisfies { state: State; level: Level };
const upper = typeof annotated.text === "string" ? annotated.text.toUpperCase() : "坐标";
console.log(upper, checked.text.toUpperCase(), "text" in asserted, setting.level); // TS TS false 2

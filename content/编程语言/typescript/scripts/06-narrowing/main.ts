// 所属章节：06-类型收窄与控制流分析
// 演示知识点：null/undefined 与真值检查、typeof/in/instanceof 收窄、赋值与分析顺序、switch 穷尽与 never、类型谓词与 asserts 守卫
// 运行命令：npm run run:06（工作目录 content/编程语言/typescript）
// 期望结果：按正文顺序输出各示例值，与正文行内注释一致
import assert from "node:assert/strict";
function textSize(value: string | null | undefined): number {
  if (value === null || value === undefined) return -1;
  return value.length;
}
function truthySize(value: string | null): number { return value ? value.length : -1; }
function category(value: unknown): string {
  if (typeof value === "string") return value.toUpperCase();
  if (typeof value === "object" && value !== null) return "对象";
  return "其他";
}
assert.equal(textSize(""), 0);
assert.equal(textSize(null), -1);
assert.equal(textSize(undefined), -1);
console.log(textSize(""), truthySize(""), category(null), category({})); // 0 -1 其他 对象

function common(left: string | number, right: string | boolean): string {
  return left === right ? left.toUpperCase() : "不同";
}
type Message = { text: string } | { code: number };
function format(message: Message): string {
  return "text" in message ? message.text : String(message.code);
}
type MaybeText = { text?: string } | { code: number };
function hasText(value: MaybeText): string {
  if ("text" in value) return value.text ?? "未设置";
  return "没有 text 属性"; // 此处仍可能是省略 text 的第一种成员。
}
function failureLabel(value: Error | string): string {
  return value instanceof Error ? value.message : value;
}
console.log(common("ts", "ts"), format({ code: 7 }), hasText({}), failureLabel(new Error("停止"))); // TS 7 没有 text 属性 停止

let changing: string | number = "ts";
const upper = changing.toUpperCase();
changing = 4;
function pad(value: string | number): string {
  if (typeof value === "number") return value.toFixed(1);
  return value.trim(); // 数值分支已返回，这里只剩 string。
}
console.log(upper, changing.toFixed(0), pad(" 类型 "), pad(2)); // TS 4 类型 2.0

type Job = { kind: "idle" } | { kind: "done"; count: number } | { kind: "failed"; reason: string };
function unreachable(value: never): never { throw new Error("未处理状态"); }
function describe(job: Job): string {
  switch (job.kind) {
    case "idle": return "等待";
    case "done": return "完成:" + job.count;
    case "failed": return "失败:" + job.reason;
    default: return unreachable(job);
  }
}
assert.equal(describe({ kind: "idle" }), "等待");
assert.equal(describe({ kind: "failed", reason: "格式" }), "失败:格式");
console.log(describe({ kind: "done", count: 0 })); // 完成:0

type User = { name: string };
function isUser(value: unknown): value is User {
  return ((typeof value === "object" && value !== null) || typeof value === "function") &&
    "name" in value && typeof value.name === "string";
}
function named() {}
const candidates: unknown[] = [{ name: "林" }, { name: "" }, null, {}, { name: 3 }, [], named];
assert.deepEqual(candidates.map(isUser), [true, true, false, false, false, false, true]);
const users: User[] = candidates.filter(isUser);
console.log(users.map((user) => user.name.length).join(",")); // 1,0,5

function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) throw new TypeError("需要字符串 name");
}
function assertCondition(condition: unknown): asserts condition {
  if (!condition) throw new Error("条件不满足");
}
const valid: unknown = { name: "" };
assertUser(valid);
assertCondition(valid.name.length === 0);
for (const invalid of [null, undefined, {}, { name: 1 }]) {
  assert.throws(() => assertUser(invalid), { name: "TypeError", message: "需要字符串 name" });
}
console.log(valid.name.length); // 0

// 所属章节：11-枚举与常量
// 演示知识点：数字与字符串枚举、成员对象与反向映射、计算成员、const enum 内联、字面量联合与常量对象替代
// 运行命令：npm run run:11（工作目录 content/编程语言/typescript）
// 期望结果：按正文顺序输出各示例值，与正文行内注释一致
export {};
enum Phase { Queued, Running = 3, Done }
enum Alias { First = 1, Second = 1 }
const phase: Phase = Phase.Done;
console.log(Phase.Queued, phase, Phase[3], Alias[1]); // 0 4 Running Second

enum Status { Ready = "ready", Failed = "failed" }
type ReadyItem = { kind: Status.Ready; count: number };
const ready: ReadyItem = { kind: Status.Ready, count: 2 };
function statusLabel(value: Status): string {
  switch (value) {
    case Status.Ready: return "就绪";
    case Status.Failed: return "失败";
    default: { const rest: never = value; return rest; }
  }
}
console.log(statusLabel(ready.kind), Status.Failed, "ready" in Status); // 就绪 failed false

enum Size {
  Fixed = 1 << 1,
  Combined = Fixed | 1,
  FromText = "abc".length,
  Explicit = 9,
}
const computedMember: Size.FromText = Size.FromText;
console.log(Size.Fixed, Size.Combined, computedMember, Size.Explicit); // 2 3 3 9

const enum Access { Read = 1, Write = 2, All = Read | Write }
const selected = Access.All;
console.log(selected, (selected & Access.Read) !== 0); // 3 true

type PlainStatus = "ready" | "failed";
const StatusValues = { Ready: "ready", Failed: "failed" } as const;
type ObjectStatus = typeof StatusValues.Ready | typeof StatusValues.Failed;
function describePlain(value: PlainStatus): string { return value; }
const objectStatus: ObjectStatus = StatusValues.Ready;
console.log(describePlain(objectStatus), Object.keys(StatusValues).join(",")); // ready Ready,Failed

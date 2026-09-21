// 所属章节：11-枚举与常量
// 演示知识点：非成员字面量、字符串成员类型、计算成员缺初始化、const enum 常量表达式与环境引用反例
// 运行命令：npm run errors:11（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
export {};

enum KnownPhase { Queued, Done }
const unrelatedLiteral: KnownPhase = 99; // 该数值字面量不是任何成员。

enum State { Ready = "ready", Failed = "failed" }
const textIsNotMember: State = "ready"; // 普通字符串字面量不是该字符串枚举成员。
const wrongMember: State.Ready = State.Failed; // 成员类型不同。

enum MissingInitializer { Computed = "abc".length, Next } // 计算成员之后必须显式初始化。
const enum NotConstant { Length = "abc".length } // const enum 只能使用允许的常量表达式。

const enum Inlined { First = 1 }
const enumObject = Inlined; // 不能把 const enum 本身作为一般运行时值。

declare const enum ExternalPhase { Ready = 1 }
const externalValue = ExternalPhase.Ready; // isolatedModules 禁止引用环境 const enum 成员。

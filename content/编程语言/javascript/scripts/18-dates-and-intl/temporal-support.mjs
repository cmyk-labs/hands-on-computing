// 所属章节：18-日期、时间与国际化
// 演示知识点：探测当前运行时是否提供 Temporal 并给出基线结论
// 运行命令：node scripts/18-dates-and-intl/temporal-support.mjs（工作目录 content/编程语言/javascript）
// 期望结果：当前 Node.js 输出 false 与“当前使用 Date 与 Intl”
const temporalAvailable = typeof globalThis.Temporal !== "undefined";
console.log(temporalAvailable);
console.log(temporalAvailable ? "可进一步核查所需 Temporal 类型" : "当前使用 Date 与 Intl");

// 按本例输入运行，输出依次为：
// false
// 当前使用 Date 与 Intl

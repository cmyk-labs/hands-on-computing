const temporalAvailable = typeof globalThis.Temporal !== "undefined";
console.log(temporalAvailable);
console.log(temporalAvailable ? "可进一步核查所需 Temporal 类型" : "当前使用 Date 与 Intl");

// 按本例输入运行，输出依次为：
// false
// 当前使用 Date 与 Intl

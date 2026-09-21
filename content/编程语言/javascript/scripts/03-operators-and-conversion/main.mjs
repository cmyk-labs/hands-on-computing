// 所属章节：03-运算与类型转换
// 演示知识点：算术与自增自减、优先级、显式与隐式转换、短路求值、空值合并与赋值、可选链、相等判断、位运算
// 运行命令：node scripts/03-operators-and-conversion/main.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各片段示例值，与行内注释一致
const x = 7;
const y = 2;
console.log(x + y, x - y, x * y, x / y, x % y, x ** y);
console.log(+"7", -x, -7 % y);
let count = 3;
console.log(count++, ++count, count--, --count);
let total = 10;
total += 2;
total *= 3;
console.log(total);
// 输出依次为：
// 9 5 14 3.5 1 49
// 7 -7 -1
// 3 5 5 3
// 36

console.log(2 + 3 * 4, (2 + 3) * 4);
console.log(2 ** 3 ** 2, (-2) ** 2, -(2 ** 2));
let order = 1;
console.log(order++ + order++ * order++, order);
// 输出依次为：
// 14 20
// 512 4 -4
// 7 4

console.log(Number(" 12 "), Number(""), Number(null), Number(undefined));
console.log(Number("12px"), String(12), String(Symbol("course")));
console.log("12" + 3, "12" - 3, 1 + true);
console.log(Boolean("false"), Boolean(0));
// 输出依次为：
// 12 0 0 NaN
// NaN 12 Symbol(course)
// 123 9 2
// true false

console.log(Boolean([]), Boolean({}), Boolean(0n), Boolean(""));
let touches = 0;
const stopped = false && touches++;
const retained = "已有值" || touches++;
const chosen = touches === 0 ? "未访问右侧" : "已访问";
console.log(stopped, retained, touches, chosen);
console.log(!"", !!"0", 0 || 10, 3 && "继续");
// 输出依次为：
// true true false false
// false 已有值 0 未访问右侧
// true true 10 继续

console.log(0 ?? 10, false ?? true, "" ?? "默认");
console.log(null ?? "默认", (null ?? 0) || 5);
let quota = 0;
quota ??= 8;
let title = "";
title ||= "未命名";
let enabled = true;
enabled &&= false;
console.log(quota, title, enabled);
// 输出依次为：
// 0 false 
// 默认 5
// 0 未命名 false

const profile = { contact: { city: "苏州" } };
const missing = null;
let keyReads = 0;
console.log(profile?.contact?.city, missing?.contact?.city);
console.log(missing?.[keyReads++], keyReads);
const plugin = {};
console.log(plugin.run?.() ?? "没有运行方法");
// 输出依次为：
// 苏州 undefined
// undefined 0
// 没有运行方法

console.log("20" < "3", 20 < 3, 2 <= 2, 3 >= 4);
const score = 7;
console.log(0 <= score && score < 10);
console.log(2 === "2", 2 == "2", false == 0, null == undefined);
console.log(2 !== "2", 2 != "2");
console.log(NaN === NaN, Object.is(NaN, NaN), Number.isNaN(NaN));
console.log(0 === -0, Object.is(0, -0), 1 / 0, 1 / -0);
console.log(NaN < 1, NaN >= 1);
// 输出依次为：
// true false true false
// true
// false true true true
// true false
// false true true
// true false Infinity -Infinity
// false false

const readBit = 0b001;
const writeBit = 0b010;
let flags = readBit | writeBit;
console.log(flags, (flags & readBit) !== 0);
flags ^= writeBit;
console.log(flags, ~0, 1 << 3, -8 >> 1, -8 >>> 1);
console.log(1 << 32, 4.9 | 0, (2 ** 32 + 1) | 0);
console.log(1n << 40n);
// 输出依次为：
// 3 true
// 1 -1 8 -4 2147483644
// 1 4 1
// 1099511627776n

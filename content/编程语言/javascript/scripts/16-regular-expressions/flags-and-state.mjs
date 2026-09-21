// 所属章节：16-正则表达式
// 演示知识点：g 标志的 lastIndex 状态、y 粘连匹配与 i、s 标志行为
// 运行命令：node scripts/16-regular-expressions/flags-and-state.mjs（工作目录 content/编程语言/javascript）
// 期望结果：同一 /a/g 两次 test 输出 true 1 与 false 0，其余与正文注释一致
const global = /a/g;
console.log(global.test("a"), global.lastIndex);
console.log(global.test("a"), global.lastIndex);
console.log(/a/.test("a"), /a/.test("a"));
const sticky = /a/y;
console.log(sticky.test("ba"), sticky.lastIndex);
sticky.lastIndex = 1;
console.log(sticky.test("ba"), sticky.lastIndex);
console.log(/^js$/i.test("JS"), /a.b/s.test("a\nb"));
const empty = /(?:)/g;
console.log(empty.exec("a")[0].length, empty.lastIndex);
console.log([..."a".matchAll(/(?:)/g)].length);

// 按本例输入运行，输出依次为：
// true 1
// false 0
// true true
// false 0
// true 2
// true true
// 0 0
// 2

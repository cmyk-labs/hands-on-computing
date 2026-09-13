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

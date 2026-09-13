const requested = "a+b.js";
const escaped = RegExp.escape(requested);
const exact = new RegExp("^" + escaped + "$", "u");
console.log(escaped);
console.log(exact.test("a+b.js"), exact.test("aaabXjs"));
console.log(new RegExp(RegExp.escape("(draft)")).test("(draft)"));

// 按本例输入运行，输出依次为：
// \x61\+b\.js
// true false
// true

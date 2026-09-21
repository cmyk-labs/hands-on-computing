// 所属章节：16-正则表达式
// 演示知识点：RegExp.escape 转义动态文本并构造精确匹配
// 运行命令：node scripts/16-regular-expressions/escape.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出转义串 \x61\+b\.js，精确匹配结果 true false 与 true
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

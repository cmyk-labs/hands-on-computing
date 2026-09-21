// 所属章节：16-正则表达式
// 演示知识点：正则字面量与 RegExp 构造、字符类、量词与贪婪/非贪婪匹配
// 运行命令：node scripts/16-regular-expressions/patterns.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，末行为 abc true
const literal = /^[A-Z]{2}-\d{3}$/;
const constructed = new RegExp("^[A-Z]{2}-\\d{3}$");
console.log(literal.test("JS-012"), literal.test("JS-12"), constructed.test("JS-012"));
console.log(/^colou?r$/.test("color"), /^ab*c$/.test("ac"), /^ab+c$/.test("ac"));
console.log(/a{2,}/.exec("baaa")[0]);
console.log(/<.*>/.exec("<a><b>")[0], /<.*?>/.exec("<a><b>")[0]);
console.log(/[^0-9]+/.exec("12abc34")[0], /\s/.test(" "));

// 按本例输入运行，输出依次为：
// true false true
// true true false
// aaa
// <a><b> <a>
// abc true

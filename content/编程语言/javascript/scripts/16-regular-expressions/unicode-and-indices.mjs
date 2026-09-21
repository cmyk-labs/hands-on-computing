// 所属章节：16-正则表达式
// 演示知识点：Unicode 属性转义、v 标志集合运算与 d 标志匹配索引
// 运行命令：node scripts/16-regular-expressions/unicode-and-indices.mjs（工作目录 content/编程语言/javascript）
// 期望结果：属性与集合匹配输出 ABC、bcdf，emoji 的索引为 [1,3] 并切出原字符
console.log(/^\p{Letter}+$/u.test("中文é"), /^\p{Letter}+$/u.test("JS1"));
const asciiLetters = /[\p{ASCII}&&\p{Letter}]+/v;
console.log(asciiLetters.exec("éABC中文")[0]);
console.log(/[[a-z]--[aeiou]]+/v.exec("ae-bcdf")[0]);
console.log(/^[\q{ab|cd}]$/v.test("ab"), /^[\q{ab|cd}]$/v.test("a"));
const match = /(?<face>😀)/du.exec("A😀B");
if (match) {
  console.log(JSON.stringify(match.indices[0]), JSON.stringify(match.indices.groups.face));
  const [start, end] = match.indices.groups.face;
  console.log("A😀B".slice(start, end));
}

// 按本例输入运行，输出依次为：
// true false
// ABC
// bcdf
// true false
// [1,3] [1,3]
// 😀

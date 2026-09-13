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

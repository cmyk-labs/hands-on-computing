const ambiguous = /^(a+)+$/;
const simpler = /^a+$/;
for (const input of ["aaa", "aaaa!"]) {
  console.log(input, ambiguous.test(input), simpler.test(input));
}
function acceptsSmallToken(text) {
  return text.length <= 64 && /^[a-z0-9-]+$/u.test(text);
}
console.log(acceptsSmallToken("note-12"), acceptsSmallToken("a".repeat(65)));

// 按本例输入运行，输出依次为：
// aaa true true
// aaaa! false false
// true false

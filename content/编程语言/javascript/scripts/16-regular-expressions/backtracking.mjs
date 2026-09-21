// 所属章节：16-正则表达式
// 演示知识点：嵌套量词的回溯行为与限定输入长度、简化模式消除回溯
// 运行命令：node scripts/16-regular-expressions/backtracking.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 aaa true true 等三组值，65 字符超长输入被拒绝（true false）
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

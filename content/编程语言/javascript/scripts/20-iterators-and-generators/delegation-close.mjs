// 所属章节：20-迭代器与生成器
// 演示知识点：委托链上 return 的内、外层 finally 执行顺序
// 运行命令：node scripts/20-iterators-and-generators/delegation-close.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 1、{"value":"停止","done":true} 与 内层,外层 true
const events = [];
function* inner() {
  try { yield 1; yield 2; }
  finally { events.push("内层"); }
}
function* outer() {
  try { yield* inner(); }
  finally { events.push("外层"); }
}
const iterator = outer();
console.log(iterator.next().value);
console.log(JSON.stringify(iterator.return("停止")));
console.log(events.join(","), iterator.next().done);

// 按本例输入运行，输出依次为：
// 1
// {"value":"停止","done":true}
// 内层,外层 true

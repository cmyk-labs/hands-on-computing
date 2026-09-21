// 所属章节：20-迭代器与生成器
// 演示知识点：return 请求经过可暂停的 finally 并中途产出值
// 运行命令：node scripts/20-iterators-and-generators/return-through-finally.mjs（工作目录 content/编程语言/javascript）
// 期望结果：中途产出 {"value":"最后一步","done":false}，最终返回结束值
function* values() {
  try { yield 1; }
  finally { yield "最后一步"; }
}
const iterator = values();
console.log(JSON.stringify(iterator.next()));
console.log(JSON.stringify(iterator.return("结束值")));
console.log(JSON.stringify(iterator.next()));
console.log(iterator.next().done);

// 按本例输入运行，输出依次为：
// {"value":1,"done":false}
// {"value":"最后一步","done":false}
// {"value":"结束值","done":true}
// true

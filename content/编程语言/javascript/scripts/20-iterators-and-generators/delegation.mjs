// 所属章节：20-迭代器与生成器
// 演示知识点：yield* 委托逐项产出并接收内部生成器结束值
// 运行命令：node scripts/20-iterators-and-generators/delegation.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 开始,Map,Set,已学:2
function* group() {
  yield "Map";
  yield "Set";
  return 2;
}
function* course() {
  yield* ["开始"];
  const count = yield* group();
  yield "已学:" + count;
}
console.log([...course()].join(","));

// 按本例输入运行，输出依次为：
// 开始,Map,Set,已学:2

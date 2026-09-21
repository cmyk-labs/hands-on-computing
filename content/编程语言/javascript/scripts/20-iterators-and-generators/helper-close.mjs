// 所属章节：20-迭代器与生成器
// 演示知识点：find 短路时自动关闭生成器而非留下游标
// 运行命令：node scripts/20-iterators-and-generators/helper-close.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 1 与 拉取1,关闭 true
const events = [];
function* values() {
  try {
    events.push("拉取1"); yield 1;
    events.push("拉取2"); yield 2;
  } finally {
    events.push("关闭");
  }
}
const iterator = values();
console.log(iterator.find(value => value === 1));
console.log(events.join(","), iterator.next().done);

// 按本例输入运行，输出依次为：
// 1
// 拉取1,关闭 true

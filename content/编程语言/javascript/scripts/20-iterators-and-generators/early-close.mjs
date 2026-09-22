// 所属章节：20-迭代器与生成器
// 演示知识点：for...of break 触发关闭与手动消费的结束责任
// 运行命令：node scripts/20-iterators-and-generators/early-close.mjs（工作目录 content/编程语言/javascript）
// 期望结果：关闭事件依次为 关闭:循环、关闭:循环,关闭:手动 true
const events = [];
function* items(label) {
  try {
    yield 1;
    yield 2;
  } finally {
    events.push("关闭:" + label);
  }
}
// for...of 的 break 会请求关闭迭代器，触发已进入的 finally。
for (const value of items("循环")) {
  console.log(value);
  break;
}
// 手动 next 的调用方负责结束迭代；这里只停止读取还不足以触发清理。
const manual = items("手动");
try {
  console.log(manual.next().value);
  console.log(events.join(","));
} finally {
  manual.return();
}
// 从未 next 的生成器尚未进入函数体，所以 return 不执行这里的 finally。
const neverStarted = items("未启动");
neverStarted.return();
console.log(events.join(","), manual.next().done);

// 按本例输入运行，输出依次为：
// 1
// 1
// 关闭:循环
// 关闭:循环,关闭:手动 true

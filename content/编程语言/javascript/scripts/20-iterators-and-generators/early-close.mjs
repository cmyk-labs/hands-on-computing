const events = [];
function* items(label) {
  try {
    yield 1;
    yield 2;
  } finally {
    events.push("关闭:" + label);
  }
}
for (const value of items("循环")) {
  console.log(value);
  break;
}
const manual = items("手动");
try {
  console.log(manual.next().value);
  console.log(events.join(","));
} finally {
  manual.return();
}
const neverStarted = items("未启动");
neverStarted.return();
console.log(events.join(","), manual.next().done);

// 按本例输入运行，输出依次为：
// 1
// 1
// 关闭:循环
// 关闭:循环,关闭:手动 true

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

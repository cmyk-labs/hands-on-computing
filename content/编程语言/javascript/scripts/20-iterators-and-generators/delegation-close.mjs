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

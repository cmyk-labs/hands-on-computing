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

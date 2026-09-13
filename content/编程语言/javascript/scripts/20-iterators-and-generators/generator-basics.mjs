const events = [];
function* lessons() {
  events.push("开始");
  yield "Map";
  yield "Set";
  return "完成";
}
const iterator = lessons();
console.log(events.length);
for (let index = 0; index < 4; index += 1) {
  const step = iterator.next();
  console.log(step.value, step.done);
}
console.log(events.join(","));
console.log([...lessons()].join(","));

// 按本例输入运行，输出依次为：
// 0
// Map false
// Set false
// 完成 true
// undefined true
// 开始
// Map,Set

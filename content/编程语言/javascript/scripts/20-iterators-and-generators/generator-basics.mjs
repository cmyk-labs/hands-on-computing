// 所属章节：20-迭代器与生成器
// 演示知识点：生成器惰性启动、逐个产出、结束值与每次新建
// 运行命令：node scripts/20-iterators-and-generators/generator-basics.mjs（工作目录 content/编程语言/javascript）
// 期望结果：创建时不执行；输出 Map false 等四步结果与 Map,Set
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

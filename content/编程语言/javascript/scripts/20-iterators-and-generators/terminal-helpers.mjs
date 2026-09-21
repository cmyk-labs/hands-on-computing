// 所属章节：20-迭代器与生成器
// 演示知识点：reduce、forEach、some、every、find 终结方法与空源规则
// 运行命令：node scripts/20-iterators-and-generators/terminal-helpers.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 9、10 等；空源 some 为 false、every 为 true、find 为 undefined
console.log(Iterator.from([2, 3, 4]).reduce((sum, value) => sum + value, 0));
console.log(Iterator.from([]).reduce((sum, value) => sum + value, 10));
const visited = [];
const result = Iterator.from(["Map", "Set"]).forEach((value, index) =>
  visited.push(String(index) + ":" + value));
console.log(visited.join(","), result);
console.log(Iterator.from([1, 2]).some(value => value % 2 === 0));
console.log(Iterator.from([1, 2]).every(value => value > 0));
console.log(Iterator.from([]).some(Boolean), Iterator.from([]).every(Boolean));
console.log(Iterator.from([1, 2]).find(value => value > 9));

// 按本例输入运行，输出依次为：
// 9
// 10
// 0:Map,1:Set undefined
// true
// true
// false true
// undefined

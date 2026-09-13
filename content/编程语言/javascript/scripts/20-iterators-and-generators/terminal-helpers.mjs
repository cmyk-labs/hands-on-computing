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

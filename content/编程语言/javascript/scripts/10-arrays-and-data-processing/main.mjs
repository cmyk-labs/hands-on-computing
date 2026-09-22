// 所属章节：10-数组与数据处理
// 演示知识点：数组构造与稀疏性、增删与 splice、查找判断、解构与展开、map/filter/reduce、flat/groupBy/toSorted 等变换方法、共享引用与回调中修改数组
// 运行命令：node scripts/10-arrays-and-data-processing/main.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各片段示例值，与行内注释一致
const values = [10, 20];
console.log(Array.isArray(values), values[0], values.at(-1), values[-1]);
values[4] = 50;
console.log(values.length, Object.hasOwn(values, 2), values[2]);
values.length = 2;
console.log(values.length, values[4]);
console.log(new Array(3).length, Object.hasOwn(new Array(3), 0), Array.of(3).join(","));
console.log(Array.from("A🚀").length);
console.log(Array.from({ length: 3 }, (value, index) => index + 1).join(","));
// 输出依次为：
// true 10 20 undefined
// 5 false undefined
// 2 undefined
// 3 false 3
// 2
// 1,2,3

const queue = ["B"];
console.log(queue.push("C"), queue.unshift("A"), queue.join(","));
console.log(queue.shift(), queue.pop(), queue.join(","));
const removed = queue.splice(0, 1, "X", "Y");
console.log(removed.join(","), queue.join(","));
queue[1] = "Z";
delete queue[0];
console.log(queue.length, Object.hasOwn(queue, 0), queue[1]);
console.log([].pop(), [].shift());
// 输出依次为：
// 2 3 A,B,C
// A C B
// B X,Y
// 2 false Z
// undefined undefined

const numbers = [4, 8, NaN, 8];
console.log(numbers.indexOf(8), numbers.indexOf(7), numbers.includes(NaN), numbers.indexOf(NaN));
console.log(numbers.find(item => item > 5), numbers.findIndex(item => item > 5));
console.log(numbers.findLast(item => item === 8), numbers.findLastIndex(item => item === 8));
console.log(numbers.find(item => item > 99), numbers.findIndex(item => item > 99));
const item = { id: 1 };
console.log([item].includes(item), [item].includes({ id: 1 }));
// 输出依次为：
// 1 -1 true -1
// 8 1
// 8 3
// undefined -1
// true false

const letters = ["A", "B", "C", "D"];
console.log(letters.slice(1, 3).join(","), letters.slice(-2).join(","), letters.join(","));
const [first, , third, ...tail] = letters;
console.log(first, third, tail.join(","));
const [fallback = "缺省"] = [];
console.log(fallback);
const appended = [...letters, "E"];
console.log(appended.join(","), letters.concat(["E"]).join(","));
// 输出依次为：
// B,C C,D A,B,C,D
// A C D
// 缺省
// A,B,C,D,E A,B,C,D,E

const prices = [2, 5, 8];
console.log(prices.map(value => value * 2).join(","));
console.log(prices.filter(value => value >= 5).join(","), prices.join(","));
const missingReturn = prices.map(value => { value * 2; });
console.log(missingReturn.length, missingReturn[0], Object.hasOwn(missingReturn, 0));
console.log(prices.filter(value => { value >= 5; }).length);
const decimalText = ["10", "10", "10"];
console.log(decimalText.map(Number.parseInt).join(","));
console.log(decimalText.map(text => Number.parseInt(text, 10)).join(","));
let visited = 0;
const foreachResult = prices.forEach(value => { visited += 1; return value; });
console.log(visited, foreachResult);
// 输出依次为：
// 4,10,16
// 5,8 2,5,8
// 3 undefined true
// 0
// 10,NaN,2
// 10,10,10
// 3 undefined

const scores = [3, 6, 9];
console.log(scores.reduce((sum, value) => sum + value, 0), [].reduce((sum, value) => sum + value, 0));
let checks = 0;
const hasLarge = scores.some(value => { checks += 1; return value >= 6; });
console.log(hasLarge, checks, scores.every(value => value > 0));
console.log([].some(value => value > 0), [].every(value => value > 0));
console.log(scores.length > 0 && scores.every(value => value > 0));
// 输出依次为：
// 18 0
// true 2 true
// false true
// true

const nested = [1, [2, [3]]];
const oneLevel = nested.flat();
console.log(oneLevel.length, Array.isArray(oneLevel[2]), nested.flat(Infinity).join(","));
const expanded = [1, 2, 3].flatMap(value => value % 2 === 0 ? [] : [value, value * 10]);
console.log(expanded.join(","));
console.log(["AB"].flatMap(value => value).join(","));
// 输出依次为：
// 3 true 1,2,3
// 1,10,3,30
// AB

const products = [
  { name: "笔", type: "文具" },
  { name: "杯", type: "生活" },
  { name: "纸", type: "文具" },
];
const groups = Object.groupBy(products, product => product.type);
console.log(Object.keys(groups).join(","), groups["文具"].length);
console.log(groups["文具"].map(product => product.name).join(","));
console.log(Object.getPrototypeOf(groups) === null, groups["文具"][0] === products[0]);
console.log(Object.keys(Object.groupBy([], value => value)).length);
// 输出依次为：
// 文具,生活 2
// 笔,纸
// true true
// 0

const sourceNumbers = [10, 2, 1];
console.log(sourceNumbers.toSorted().join(","));
const ordered = sourceNumbers.toSorted((left, right) => left - right);
console.log(ordered.join(","), sourceNumbers.join(","));
console.log(sourceNumbers.sort((left, right) => left - right) === sourceNumbers, sourceNumbers.join(","));
const records = [{ id: "A", rank: 2 }, { id: "B", rank: 1 }, { id: "C", rank: 2 }];
console.log(records.toSorted((left, right) => left.rank - right.rank).map(record => record.id).join(","));
// 输出依次为：
// 1,10,2
// 1,2,10 10,2,1
// true 1,2,10
// B,A,C

const original = [1, 2, 3];
console.log(original.toReversed().join(","));
console.log(original.toSpliced(1, 1, 8, 9).join(","));
console.log(original.with(-1, 7).join(","), original.join(","));
const mutable = [1, 2, 3];
console.log(mutable.reverse() === mutable, mutable.join(","));
// 输出依次为：
// 3,2,1
// 1,8,9,3
// 1,2,7 1,2,3
// true 3,2,1

const sparse = [, 2, undefined];
console.log(sparse.length, Object.hasOwn(sparse, 0), Object.hasOwn(sparse, 2));
let mapCalls = 0;
const mapped = sparse.map(value => { mapCalls += 1; return value; });
console.log(mapCalls, Object.hasOwn(mapped, 0), Object.hasOwn(mapped, 2));
console.log(sparse.filter(() => true).length);
let findCalls = 0;
sparse.find(value => { findCalls += 1; return false; });
console.log(findCalls);
console.log([,].includes(undefined), [,].indexOf(undefined));
const sliced = sparse.slice();
const spread = [...sparse];
console.log(Object.hasOwn(sliced, 0), Object.hasOwn(spread, 0), Object.hasOwn(Array.from(sparse), 0));
console.log(Object.hasOwn(sparse.toReversed(), 2), [1, , [2, , 3]].flat().join(","));
// 输出依次为：
// 3 false true
// 2 false true
// 2
// 3
// true -1
// false true true
// true 1,2,3

// 先比较只复制外层数组和同时复制对象元素，观察共享引用在哪一层。
const sourceRows = [{ count: 1 }];
const shallow = sourceRows.slice();
shallow[0].count = 4;
console.log(shallow !== sourceRows, shallow[0] === sourceRows[0], sourceRows[0].count);
const separate = sourceRows.map(row => ({ ...row }));
separate[0].count = 8;
console.log(sourceRows[0].count, separate[0].count);
// fill 重复放入同一个对象；Array.from 的回调每次创建新对象。
const repeated = new Array(2).fill({ count: 0 });
repeated[0].count = 1;
const independent = Array.from({ length: 2 }, () => ({ count: 0 }));
independent[0].count = 1;
console.log(repeated[1].count, independent[1].count);
// 有意在回调中改输入：第二项的新值会被读取，新追加的第三项不在原访问范围。
const changing = [1, 2];
const observed = changing.map((value, index) => {
  if (index === 0) {
    changing[1] = 9;
    changing.push(3);
  }
  return value;
});
console.log(observed.join(","), changing.join(","));
// 输出依次为：
// true true 4
// 4 8
// 1 0
// 1,9 1,9,3

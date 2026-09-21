// 所属章节：20-迭代器与生成器
// 演示知识点：容器可重复遍历与游标一次性的区别
// 运行命令：node scripts/20-iterators-and-generators/consumption.mjs（工作目录 content/编程语言/javascript）
// 期望结果：游标二次展开长度为 0，容器仍可展开出全部值
const values = [undefined, "JS"];
const iterator = values.values();
console.log(iterator[Symbol.iterator]() === iterator);
const first = iterator.next();
console.log(first.value, first.done);
console.log([...iterator].join(","));
console.log([...iterator].length, [...values].length);
console.log([...new Set(["A", "A", "B"])].join(","));
const iteratorOnly = { next() { return { done: true }; } };
console.log(typeof iteratorOnly.next, typeof iteratorOnly[Symbol.iterator]);

// 按本例输入运行，输出依次为：
// true
// undefined false
// JS
// 0 2
// A,B
// function undefined

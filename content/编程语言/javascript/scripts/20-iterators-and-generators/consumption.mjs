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

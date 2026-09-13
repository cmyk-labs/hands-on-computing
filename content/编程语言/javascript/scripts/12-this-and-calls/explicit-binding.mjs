function describe(prefix, suffix) { return prefix + this.title + suffix; }
const item = { title: "集合" };
console.log(describe.call(item, "[", "]"));
console.log(describe.apply(item, ["<", ">"]));
const bound = describe.bind(item, "(");
console.log(bound(")"), bound.call({ title: "其他" }, ")"));
const run = callback => callback();
const counter = { value: 0, increment() { return ++this.value; } };
console.log(run(counter.increment.bind(counter)));
console.log(run(() => counter.increment()));

// 按本例输入运行，输出依次为：
// [集合]
// <集合>
// (集合) (集合)
// 1
// 2

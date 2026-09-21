// 所属章节：12-this 与调用方式
// 演示知识点：call/apply/bind 显式绑定、部分参数与回调中保留接收者
// 运行命令：node scripts/12-this-and-calls/explicit-binding.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
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

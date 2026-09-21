// 所属章节：13-原型与原型链
// 演示知识点：构造函数 prototype 上共享方法、实例与构造侧的原型关系
// 运行命令：node scripts/13-prototypes/constructor-prototype.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
function Notebook(title) { this.title = title; }
Notebook.prototype.describe = function () { return "笔记:" + this.title; };
const first = new Notebook("对象");
const second = new Notebook("类");
console.log(first.describe(), second.describe());
console.log(first.describe === second.describe, Object.hasOwn(first, "describe"));
console.log(Object.getPrototypeOf(first) === Notebook.prototype);
console.log(Object.getPrototypeOf(Notebook) === Function.prototype);
console.log(first.prototype, first.constructor === Notebook);

// 按本例输入运行，输出依次为：
// 笔记:对象 笔记:类
// true false
// true
// true
// undefined true

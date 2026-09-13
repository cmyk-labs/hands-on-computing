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

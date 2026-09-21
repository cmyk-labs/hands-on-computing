// 所属章节：13-原型与原型链
// 演示知识点：instanceof 只比较原型，未执行构造也可具有同一原型
// 运行命令：node scripts/13-prototypes/instance-checks.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
function Ticket() { this.initialized = true; }
const constructed = new Ticket();
const linkedOnly = Object.create(Ticket.prototype);
console.log(constructed instanceof Ticket, linkedOnly instanceof Ticket);
console.log(constructed.initialized, linkedOnly.initialized);
const oldPrototype = Ticket.prototype;
Ticket.prototype = {};
console.log(constructed instanceof Ticket, new Ticket() instanceof Ticket);
console.log(Object.getPrototypeOf(constructed) === oldPrototype);

// 按本例输入运行，输出依次为：
// true true
// true undefined
// false true
// true

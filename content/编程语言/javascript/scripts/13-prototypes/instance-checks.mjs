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

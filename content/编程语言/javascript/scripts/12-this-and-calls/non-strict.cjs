function receiver() { return this; }
console.log(receiver() === globalThis, receiver.call(null) === globalThis);
const boxed = receiver.call(7);
console.log(typeof boxed, boxed.valueOf());
function strictReceiver() { "use strict"; return this; }
console.log(strictReceiver() === undefined, strictReceiver.call(7) === 7);

// 按本例输入运行，输出依次为：
// true true
// object 7
// true true

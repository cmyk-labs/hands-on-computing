function receiver() { return this; }
const first = { receiver };
const second = { receiver: first.receiver };
console.log(first.receiver() === first, second.receiver() === second);
const detached = first.receiver;
console.log(detached() === undefined, this === undefined);
console.log(receiver.call(null) === null, receiver.call(7) === 7);

// 按本例输入运行，输出依次为：
// true true
// true true
// true true

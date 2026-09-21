// 所属章节：12-this 与调用方式
// 演示知识点：非严格函数的默认接收者与原始值装箱，函数内严格模式的对比
// 运行命令：node scripts/12-this-and-calls/non-strict.cjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
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

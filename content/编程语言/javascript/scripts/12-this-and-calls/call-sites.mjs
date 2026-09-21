// 所属章节：12-this 与调用方式
// 演示知识点：同一函数在方法调用、独立调用与 call 传值下的 this 差异
// 运行命令：node scripts/12-this-and-calls/call-sites.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
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

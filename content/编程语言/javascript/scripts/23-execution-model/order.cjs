// 所属章节：23-执行模型与异步调度
// 演示知识点：CommonJS 顶层 process.nextTick 先于微任务的调度
// 运行命令：node scripts/23-execution-model/order.cjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 sync,nextTick,promise,microtask
const events = ["sync"];
process.nextTick(() => events.push("nextTick"));
Promise.resolve().then(() => events.push("promise"));
queueMicrotask(() => events.push("microtask"));
setImmediate(() => console.log(events.join(","))); // → sync,nextTick,promise,microtask

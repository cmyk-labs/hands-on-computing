// 所属章节：23-执行模型与异步调度
// 演示知识点：ESM 顶层 nextTick 排在微任务之后的调度差异
// 运行命令：node scripts/23-execution-model/order.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 sync,promise,microtask,nextTick
const events = ["sync"];
process.nextTick(() => events.push("nextTick"));
Promise.resolve().then(() => events.push("promise"));
queueMicrotask(() => events.push("microtask"));
setImmediate(() => console.log(events.join(","))); // → sync,promise,microtask,nextTick

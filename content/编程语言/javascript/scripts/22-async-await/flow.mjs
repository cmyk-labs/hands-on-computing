// 所属章节：22-async 与 await
// 演示知识点：await 暂停时机、return await 捕获与 finally 清理顺序
// 运行命令：node scripts/22-async-await/flow.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 8 start,caller,resume、read failed cleanup 与 forwarded
// 1. events 把 await 前、调用方和恢复后的执行顺序放在一起。
const events = [];
async function compute() {
  events.push("start");
  const value = await 4;
  events.push("resume");
  return value * 2;
}
const pending = compute();
events.push("caller");
console.log(await pending, events.join(",")); // → 8 start,caller,resume

// 2. return await 在当前 try 内等待，因此拒绝能由本函数捕获。
async function handle() {
  try {
    return await Promise.reject(new Error("read failed"));
  } catch (error) {
    return error.message;
  } finally {
    events.push("cleanup");
  }
}
console.log(await handle(), events.at(-1)); // → read failed cleanup

// 3. 对照：直接返回 Promise 时，下面的 catch 捕获不到其后续拒绝。
async function forward() {
  try {
    return Promise.reject(new Error("forwarded"));
  } catch {
    return "not reached";
  }
}
console.log(await forward().catch((error) => error.message)); // → forwarded

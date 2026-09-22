// 所属章节：22-async 与 await
// 演示知识点：同步生成器产出拒绝值时 for await 的两条清理路径
// 运行命令：node scripts/22-async-await/sync-close.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 rejection cleanup,closed、paused cleanup 与 resumed cleanup,closed
import assert from "node:assert/strict";

const events = [];
function* items(pauseInFinally = false) {
  try {
    yield Promise.reject(new Error("item rejected"));
  } finally {
    events.push("cleanup");
    // 专门构造清理过程再次暂停的对照，观察关闭尝试与清理完成的区别。
    if (pauseInFinally) yield "paused";
    events.push("closed");
  }
}
async function consume(iterator) {
  for await (const value of iterator) events.push(value);
}

// 第一组：清理中没有暂停，一次关闭尝试即可执行到 closed。
const source = items();
await assert.rejects(() => consume(source), { name: "Error", message: "item rejected" });
assert.deepEqual(events, ["cleanup", "closed"]);
assert.deepEqual(source.next(), { value: undefined, done: true });
console.log("rejection", events.join(",")); // → rejection cleanup,closed

// 第二组：finally 中再次 yield；随后显式 next 才推进剩余清理。
events.length = 0;
const suspended = items(true);
await assert.rejects(() => consume(suspended), { name: "Error", message: "item rejected" });
assert.deepEqual(events, ["cleanup"]);
console.log("paused", events.join(",")); // → paused cleanup；关闭尝试没有继续推进 finally 中的 yield
assert.deepEqual(suspended.next(), { value: undefined, done: true });
assert.deepEqual(events, ["cleanup", "closed"]);
console.log("resumed", events.join(",")); // → resumed cleanup,closed；显式 next 使本例清理完成

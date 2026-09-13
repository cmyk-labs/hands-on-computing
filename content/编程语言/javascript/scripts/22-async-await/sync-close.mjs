import assert from "node:assert/strict";

const events = [];
function* items(pauseInFinally = false) {
  try {
    yield Promise.reject(new Error("item rejected"));
  } finally {
    events.push("cleanup");
    if (pauseInFinally) yield "paused";
    events.push("closed");
  }
}
async function consume(iterator) {
  for await (const value of iterator) events.push(value);
}

const source = items();
await assert.rejects(() => consume(source), { name: "Error", message: "item rejected" });
assert.deepEqual(events, ["cleanup", "closed"]);
assert.deepEqual(source.next(), { value: undefined, done: true });
console.log("rejection", events.join(",")); // → rejection cleanup,closed

events.length = 0;
const suspended = items(true);
await assert.rejects(() => consume(suspended), { name: "Error", message: "item rejected" });
assert.deepEqual(events, ["cleanup"]);
console.log("paused", events.join(",")); // → paused cleanup；关闭尝试没有继续推进 finally 中的 yield
assert.deepEqual(suspended.next(), { value: undefined, done: true });
assert.deepEqual(events, ["cleanup", "closed"]);
console.log("resumed", events.join(",")); // → resumed cleanup,closed；显式 next 使本例清理完成

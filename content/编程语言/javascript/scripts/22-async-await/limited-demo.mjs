// 所属章节：22-async 与 await
// 演示知识点：并发上限、空输入、失败后排空与 AbortController 取消
// 运行命令：node scripts/22-async-await/limited-demo.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 limit=2 ordered empty failure-drained 与 cancelled and observed
import assert from "node:assert/strict";
import { setImmediate as yieldTurn } from "node:timers/promises";
import { mapLimited } from "./limited.mjs";

// 1. active 记录当前任务数，peak 记录最高值；finally 使失败时也能减回去。
let active = 0;
let peak = 0;
const values = await mapLimited([1, 2, 3, 4, 5], 2, async (value) => {
  active += 1;
  peak = Math.max(peak, active);
  try { await yieldTurn(); return value * 2; }
  finally { active -= 1; }
});
assert.deepEqual(values, [2, 4, 6, 8, 10]);
assert.equal(peak, 2);
assert.equal(active, 0);
assert.deepEqual(await mapLimited([], 2, () => 1), []);

// 2. 首项故意失败，第二项完成，第三项应始终没有被领取。
let drained = false;
const started = [];
await assert.rejects(mapLimited([1, 2, 3], 2, async (value) => {
  started.push(value);
  if (value === 1) throw new Error("worker failed");
  await yieldTurn();
  drained = true;
}), /worker failed/);
assert.deepEqual(started, [1, 2]);
assert.equal(drained, true);
console.log("limit=2 ordered empty failure-drained"); // → limit=2 ordered empty failure-drained

// 3. 取消是另一项宿主能力：先接住拒绝，再发出取消信号。
const controller = new AbortController();
const operation = yieldTurn("unused", { signal: controller.signal });
const rejection = assert.rejects(operation, { name: "AbortError" });
controller.abort();
await rejection;
console.log("cancelled and observed"); // → cancelled and observed

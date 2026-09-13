import assert from "node:assert/strict";
import { setImmediate as yieldTurn } from "node:timers/promises";
import { mapLimited } from "./limited.mjs";

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
await assert.rejects(mapLimited([1], 0, () => 1), /limit must be positive/);

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

const controller = new AbortController();
const operation = yieldTurn("unused", { signal: controller.signal });
const rejection = assert.rejects(operation, { name: "AbortError" });
controller.abort();
await rejection;
console.log("cancelled and observed"); // → cancelled and observed

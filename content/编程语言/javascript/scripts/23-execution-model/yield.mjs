// 所属章节：23-执行模型与异步调度
// 演示知识点：分批计算并在 setImmediate 处让出执行机会
// 运行命令：node scripts/23-execution-model/yield.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 500500 callback after 250
import assert from "node:assert/strict";
import { setImmediate as yieldTurn } from "node:timers/promises";
let processed = 0;
let observed;
setImmediate(() => { observed = processed; });
let total = 0;
for (let start = 1; start <= 1000; start += 250) {
  for (let value = start; value < start + 250; value += 1) {
    total += value;
    processed += 1;
  }
  await yieldTurn();
}
assert.equal(total, 500500);
assert.equal(observed, 250);
console.log(total, "callback after", observed); // → 500500 callback after 250

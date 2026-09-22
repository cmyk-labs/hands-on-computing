// 所属章节：29-内存管理与性能分析
// 演示知识点：等价断言、交替预热与七轮重复计时
// 运行命令：node scripts/29-memory-performance/benchmark.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出采样与中位数 JSON、批次时长及 equivalent results; 7 trials complete
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { scanGroups, onePass } from "./algorithms.mjs";

// 1. 先核对小型边界输入；计时前再确认实际工作负载的完整结果相同。
for (const rows of [[], [{ group: 0, amount: 0 }], [{ group: 1, amount: 3 }, { group: 1, amount: 4 }]]) {
  assert.deepEqual(scanGroups(rows), onePass(rows));
}
const rows = Array.from({ length: 20000 }, (_, index) => ({ group: index % 100, amount: index % 17 }));
const expected = onePass(rows);
assert.deepEqual(scanGroups(rows), expected);
// 2. 两种实现都先执行四次预热，这部分不计入下面的单次样本。
for (let round = 0; round < 4; round += 1) { scanGroups(rows); onePass(rows); }
const samples = { scanGroups: [], onePass: [] };
performance.mark("comparison-start");
for (let round = 0; round < 7; round += 1) {
  // 3. 交替测试顺序；记录调用耗时后才做结果断言。
  const functions = round % 2 === 0 ? [scanGroups, onePass] : [onePass, scanGroups];
  for (const run of functions) {
    const start = performance.now();
    const result = run(rows);
    const elapsed = performance.now() - start;
    assert.deepEqual(result, expected);
    samples[run.name].push(elapsed);
  }
}
performance.mark("comparison-end");
performance.measure("comparison", "comparison-start", "comparison-end");
// 4. 本例固定采集七次，排序后的下标 3 就是中位数。
function median(values) { return values.toSorted((left, right) => left - right)[3]; }
const scanMs = median(samples.scanGroups);
const passMs = median(samples.onePass);
// JSON 的 samplesMs 中两种算法各有 7 个毫秒样本；medianMs 各有一个中位数。
// ratio 是两者中位数的比值，具体耗时与比值随本次运行变化。
console.log(JSON.stringify({ samplesMs: samples, medianMs: { scanGroups: scanMs, onePass: passMs }, ratio: scanMs / passMs }));
// → batch duration ms 后接本次整批耗时；单位为毫秒，还包含断言和循环开销。
console.log("batch duration ms", performance.getEntriesByName("comparison")[0].duration);
performance.clearMarks();
performance.clearMeasures();
console.log("equivalent results; 7 trials complete"); // → equivalent results; 7 trials complete；耗时与比值为本次测量

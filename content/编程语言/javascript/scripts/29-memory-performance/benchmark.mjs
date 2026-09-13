import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { scanGroups, onePass } from "./algorithms.mjs";

for (const rows of [[], [{ group: 0, amount: 0 }], [{ group: 1, amount: 3 }, { group: 1, amount: 4 }]]) {
  assert.deepEqual(scanGroups(rows), onePass(rows));
}
const rows = Array.from({ length: 20000 }, (_, index) => ({ group: index % 100, amount: index % 17 }));
const expected = onePass(rows);
assert.deepEqual(scanGroups(rows), expected);
for (let round = 0; round < 4; round += 1) { scanGroups(rows); onePass(rows); }
const samples = { scanGroups: [], onePass: [] };
performance.mark("comparison-start");
for (let round = 0; round < 7; round += 1) {
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
function median(values) { return values.toSorted((left, right) => left - right)[3]; }
const scanMs = median(samples.scanGroups);
const passMs = median(samples.onePass);
console.log(JSON.stringify({ samplesMs: samples, medianMs: { scanGroups: scanMs, onePass: passMs }, ratio: scanMs / passMs }));
console.log("batch duration ms", performance.getEntriesByName("comparison")[0].duration);
performance.clearMarks();
performance.clearMeasures();
console.log("equivalent results; 7 trials complete"); // → equivalent results; 7 trials complete；耗时与比值为本次测量

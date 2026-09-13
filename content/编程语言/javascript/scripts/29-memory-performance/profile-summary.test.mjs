import assert from "node:assert/strict";
import { summarizeSamples } from "./profile-summary.mjs";

// 固定测试数据，只保留统计所需字段和用于说明调用路径的 children。
const frame = (functionName, lineNumber) => ({
  functionName, scriptId: "1", url: "file:///fixture-a.mjs", lineNumber, columnNumber: 0,
});
const profile = {
  nodes: [
    { id: 1, callFrame: frame("root", 0), children: [2, 3] },
    { id: 2, callFrame: frame("callerA", 1), children: [4, 6, 7] },
    { id: 3, callFrame: frame("callerB", 2), children: [5, 8] },
    { id: 4, callFrame: frame("work", 10) },
    { id: 5, callFrame: frame("work", 10) },
    { id: 6, callFrame: { ...frame("work", 10), scriptId: "2", url: "file:///fixture-b.mjs" } },
    { id: 7, callFrame: frame("", 20) },
    { id: 8, callFrame: frame("", 30) },
  ],
  samples: [4, 4, 5, 6, 7, 8],
};
const rows = summarizeSamples(profile);
assert.deepEqual(rows.map(({ id, samples }) => [id, samples]), [[4, 2], [5, 1], [6, 1], [7, 1], [8, 1]]);
assert.equal(rows.filter((row) => row.functionName === "work").length, 3);
assert.equal(rows.filter((row) => row.functionName === "(anonymous)").length, 2);
assert.deepEqual(rows[0], {
  id: 4, functionName: "work", scriptId: "1", url: "file:///fixture-a.mjs",
  lineNumber: 10, columnNumber: 0, samples: 2,
});
assert.equal(rows[2].url, "file:///fixture-b.mjs");
console.log("same names and distinct paths kept separate"); // → same names and distinct paths kept separate
assert.throws(() => summarizeSamples({ ...profile, samples: [99] }), {
  name: "AssertionError", message: "sample must reference a known node",
});
console.log("unknown sample rejected"); // → unknown sample rejected

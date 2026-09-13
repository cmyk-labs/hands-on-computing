import assert from "node:assert/strict";
function createReader(rows) {
  return () => rows.length;
}
let rows = Array.from({ length: 1000 }, (_, index) => ({ index }));
const cache = new Map();
cache.set("report", createReader(rows));
rows = null;
assert.equal(cache.get("report")(), 1000);
console.log("reachable through closure", cache.get("report")()); // → reachable through closure 1000
cache.clear();
assert.equal(cache.size, 0);
console.log("cache references removed"); // → cache references removed；不承诺 GC 完成时刻

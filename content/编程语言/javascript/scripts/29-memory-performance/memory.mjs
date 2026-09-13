import assert from "node:assert/strict";
assert.equal(typeof globalThis.gc, "function", "run with --expose-gc");
function sample(label) {
  globalThis.gc();
  const { heapUsed, heapTotal, rss, external, arrayBuffers } = process.memoryUsage();
  console.log(JSON.stringify({ label, heapUsed, heapTotal, rss, external, arrayBuffers }));
}
function createReader() {
  const records = Array.from({ length: 50000 }, (_, index) => ({ index, name: `record-${index}` }));
  return () => records.length;
}
sample("before");
const cache = new Map([["report", createReader()]]);
assert.equal(cache.get("report")(), 50000);
sample("retained");
cache.clear();
assert.equal(cache.size, 0);
sample("released references");
console.log("memory samples complete"); // → memory samples complete；三次内存数字随运行变化

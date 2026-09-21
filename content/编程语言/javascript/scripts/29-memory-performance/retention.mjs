// 所属章节：29-内存管理与性能分析
// 演示知识点：闭包持有大数组与显式清空缓存的引用
// 运行命令：node scripts/29-memory-performance/retention.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 reachable through closure 1000 与 cache references removed
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

// 所属章节：29-内存管理与性能分析
// 演示知识点：--expose-gc 下创建前、持有中、释放后三处内存采样
// 运行命令：node --expose-gc scripts/29-memory-performance/memory.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出三组内存 JSON 与 memory samples complete（数值随运行变化）
import assert from "node:assert/strict";
// 按头部命令使用 --expose-gc；缺少运行条件时直接暴露调用异常。
function sample(label) {
  globalThis.gc();
  const { heapUsed, heapTotal, rss, external, arrayBuffers } = process.memoryUsage();
  // 三行 label 依次为 before、retained、released references；五个内存字段均以字节计。
  // 数字随进程变化；清空引用后不要求 rss 或 heapTotal 立即降回初值。
  console.log(JSON.stringify({ label, heapUsed, heapTotal, rss, external, arrayBuffers }));
}
function createReader() {
  const records = Array.from({ length: 50000 }, (_, index) => ({ index, name: `record-${index}` }));
  return () => records.length;
}
// 分别在建立引用前、缓存持有时和清空后采样，数值来自本次进程。
sample("before");
const cache = new Map([["report", createReader()]]);
assert.equal(cache.get("report")(), 50000);
sample("retained");
cache.clear();
assert.equal(cache.size, 0);
sample("released references");
console.log("memory samples complete"); // → memory samples complete；三次内存数字随运行变化

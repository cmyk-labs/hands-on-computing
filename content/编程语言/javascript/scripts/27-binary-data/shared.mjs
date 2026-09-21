// 所属章节：27-二进制数据与类型化数组
// 演示知识点：SharedArrayBuffer 共享视图与 Atomics 原子更新
// 运行命令：node scripts/27-binary-data/shared.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 shared atomic value 10
import assert from "node:assert/strict";
const buffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
const counts = new Int32Array(buffer);
const alias = new Int32Array(buffer);
assert.equal(Atomics.store(counts, 0, 5), 5);
assert.equal(Atomics.add(counts, 0, 2), 5);
assert.equal(Atomics.load(alias, 0), 7);
assert.equal(Atomics.compareExchange(counts, 0, 7, 10), 7);
assert.equal(Atomics.compareExchange(counts, 0, 7, 99), 10);
console.log("shared atomic value", Atomics.load(alias, 0)); // → shared atomic value 10

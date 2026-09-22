// 所属章节：27-二进制数据与类型化数组
// 演示知识点：可调整缓冲区的长度跟踪、越界恢复、截断与 transfer 分离
// 运行命令：node scripts/27-binary-data/resize-transfer.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 1,2,0,0、moved 1,2,0,0 与 detached and resize policies checked
import assert from "node:assert/strict";
const buffer = new ArrayBuffer(4, { maxByteLength: 8 });
// 未指定长度的视图跟踪缓冲区；显式给出 4 的视图固定长度。
const tracking = new Uint8Array(buffer);
const fixed = new Uint8Array(buffer, 0, 4);
tracking.set([1, 2, 3, 4]);
// 先扩展，再缩短到固定视图越界，最后重新扩展观察长度与数据。
buffer.resize(6);
assert.equal(tracking.length, 6);
assert.equal(fixed.length, 4);
assert.equal(tracking[5], 0);
buffer.resize(2);
assert.equal(fixed.length, 0);
assert.equal(tracking.length, 2);
buffer.resize(4);
assert.equal(fixed.length, 4);
console.log(tracking.join(",")); // → 1,2,0,0；被截断字节不会恢复
assert.throws(() => buffer.resize(9), RangeError);

// transfer 后改用新缓冲区；旧缓冲区及其视图已不能继续访问原字节。
const view = new DataView(buffer);
const moved = buffer.transferToFixedLength();
assert.equal(buffer.detached, true);
assert.equal(tracking.length, 0);
assert.throws(() => view.getUint8(0), TypeError);
assert.equal(moved.resizable, false);
console.log("moved", new Uint8Array(moved).join(",")); // → moved 1,2,0,0
// 对照 transfer：它保留本例缓冲区的可调整属性。
const growable = new ArrayBuffer(2, { maxByteLength: 4 });
const transferred = growable.transfer();
assert.equal(transferred.resizable, true);
console.log("detached and resize policies checked"); // → detached and resize policies checked

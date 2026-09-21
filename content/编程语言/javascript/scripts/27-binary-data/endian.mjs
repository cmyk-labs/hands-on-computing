// 所属章节：27-二进制数据与类型化数组
// 演示知识点：DataView 显式字节序读写、混合字段布局与对齐检查
// 运行命令：node scripts/27-binary-data/endian.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 7f 12 34 01 与 big 4660 little 13330
import assert from "node:assert/strict";
const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);
view.setUint8(0, 0x7f);
view.setUint16(1, 0x1234, false);
view.setUint8(3, 1);
console.log([...new Uint8Array(buffer)].map((value) => value.toString(16).padStart(2, "0")).join(" "));
// → 7f 12 34 01
assert.equal(view.getUint16(1, false), 0x1234);
assert.equal(view.getUint16(1, true), 0x3412);
assert.throws(() => view.getUint32(1), RangeError);
console.log("big", view.getUint16(1), "little", view.getUint16(1, true)); // → big 4660 little 13330

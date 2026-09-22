// 所属章节：27-二进制数据与类型化数组
// 演示知识点：多视图共享缓冲区、subarray 与 slice 的区别、数值类型转换
// 运行命令：node scripts/27-binary-data/views.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 3 3 2、shared 80 copied 70、1,255 与 255,0 等
import assert from "node:assert/strict";
// 1. buffer 持有字节，两个视图以不同起点观察同一块存储。
const buffer = new ArrayBuffer(8);
const bytes = new Uint8Array(buffer);
const tail = new Uint8Array(buffer, 2, 3);
tail[0] = 70;
assert.equal(bytes[2], 70);
console.log(tail.length, tail.byteLength, tail.byteOffset); // → 3 3 2
// 2. subarray 共享原字节，slice 复制字节；修改前者用于比较两种结果。
const shared = bytes.subarray(2, 4);
const copied = bytes.slice(2, 4);
shared[0] = 80;
assert.equal(bytes[2], 80);
assert.equal(copied[0], 70);
console.log("shared", bytes[2], "copied", copied[0]); // → shared 80 copied 70
// 3. 同样的数值按不同元素类型写入，会采用不同的转换规则。
console.log(new Uint8Array([257, -1]).join(",")); // → 1,255；按无符号 8 位转换
console.log(new Uint8ClampedArray([257, -1]).join(",")); // → 255,0；钳制到范围内
assert.equal(new Float16Array([1.5])[0], 1.5);
assert.equal(new BigInt64Array([12n])[0], 12n);
assert.throws(() => new BigInt64Array([12]), TypeError);
assert.throws(() => new Uint16Array(buffer, 1), RangeError);
console.log("numeric types and alignment checked"); // → numeric types and alignment checked

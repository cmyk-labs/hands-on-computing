// 所属章节：29-内存管理与性能分析
// 演示知识点：WeakRef 解引用、FinalizationRegistry 登记与撤销
// 运行命令：node scripts/29-memory-performance/weak.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 deref same job and unregister checked；不等待最终清理回调
import assert from "node:assert/strict";
let target = { name: "preview" };
const reference = new WeakRef(target);
const token = {};
const cleanupMessages = [];
const registry = new FinalizationRegistry((heldValue) => cleanupMessages.push(heldValue));
registry.register(target, "preview entry", token);
assert.equal(reference.deref(), target);
assert.equal(registry.unregister(token), true);
assert.equal(registry.unregister(token), false);
target = null;
const current = reference.deref();
assert.equal(current.name, "preview");
assert.equal(cleanupMessages.length, 0);
assert.throws(() => new WeakRef(Symbol.for("registered")), TypeError);
console.log("deref same job and unregister checked"); // → deref same job and unregister checked
// 本例不等待最终清理回调；已撤销登记，不把 GC 调度当成成功条件。

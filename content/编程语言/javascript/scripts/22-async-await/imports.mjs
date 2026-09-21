// 所属章节：22-async 与 await
// 演示知识点：两次动态导入共享同一模块实例与缺失模块拒绝
// 运行命令：node scripts/22-async-await/imports.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 12 与 missing module rejected
import assert from "node:assert/strict";
const first = await import("./feature.mjs");
const second = await import("./feature.mjs");
assert.equal(first, second);
console.log(first.scale(4)); // → 12
await assert.rejects(import("./not-present.mjs"), { code: "ERR_MODULE_NOT_FOUND" });
console.log("missing module rejected"); // → missing module rejected

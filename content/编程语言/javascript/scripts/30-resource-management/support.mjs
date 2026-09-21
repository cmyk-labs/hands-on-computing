// 所属章节：30-显式资源管理
// 演示知识点：using/await using 语法与 Symbol.dispose 等内置支持的存在性
// 运行命令：node scripts/30-resource-management/support.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 async 先于 sync 的释放顺序与 syntax and resource builtins available
import assert from "node:assert/strict";
assert.equal(typeof Symbol.dispose, "symbol");
assert.equal(typeof Symbol.asyncDispose, "symbol");
assert.equal(typeof DisposableStack, "function");
assert.equal(typeof AsyncDisposableStack, "function");
assert.equal(typeof SuppressedError, "function");
const events = [];
{
  using sync = { [Symbol.dispose]() { events.push("sync"); } };
  await using asyncResource = { async [Symbol.asyncDispose]() { await Promise.resolve(); events.push("async"); } };
}
assert.deepEqual(events, ["async", "sync"]);
console.log("syntax and resource builtins available"); // → syntax and resource builtins available

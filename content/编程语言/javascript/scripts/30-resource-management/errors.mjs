// 所属章节：30-显式资源管理
// 演示知识点：同步与异步释放链的 SuppressedError 复合异常断言
// 运行命令：node scripts/30-resource-management/errors.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 sync error chain first/second/body 与 async error chain cleanup/body
import assert from "node:assert/strict";
assert.throws(() => {
  using item = { [Symbol.dispose]() {} };
  throw new Error("body only");
}, /body only/);
assert.throws(() => {
  using item = { [Symbol.dispose]() { throw new Error("dispose only"); } };
}, /dispose only/);

const released = [];
assert.throws(() => {
  using first = { [Symbol.dispose]() { released.push("first"); throw new Error("first cleanup"); } };
  using second = { [Symbol.dispose]() { released.push("second"); throw new Error("second cleanup"); } };
  throw new Error("body");
}, (error) => {
  assert.ok(error instanceof SuppressedError);
  assert.equal(error.error.message, "first cleanup");
  assert.ok(error.suppressed instanceof SuppressedError);
  assert.equal(error.suppressed.error.message, "second cleanup");
  assert.equal(error.suppressed.suppressed.message, "body");
  return true;
});
assert.deepEqual(released, ["second", "first"]);
console.log("sync error chain first/second/body"); // → sync error chain first/second/body

async function failAsync() {
  await using item = { async [Symbol.asyncDispose]() {
    await Promise.resolve();
    throw new Error("async cleanup");
  } };
  throw new Error("async body");
}
await assert.rejects(failAsync(), (error) => {
  assert.ok(error instanceof SuppressedError);
  assert.equal(error.error.message, "async cleanup");
  assert.equal(error.suppressed.message, "async body");
  return true;
});
assert.throws(() => { using invalid = {}; }, TypeError);
console.log("async error chain cleanup/body"); // → async error chain cleanup/body

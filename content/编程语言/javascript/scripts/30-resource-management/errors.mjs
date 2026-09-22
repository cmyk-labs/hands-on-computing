// 所属章节：30-显式资源管理
// 演示知识点：同步与异步释放链的 SuppressedError 复合异常断言
// 运行命令：node scripts/30-resource-management/errors.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 sync error chain first/second/body 与 async error chain cleanup/body
import assert from "node:assert/strict";
// 单独比较正文失败与仅释放失败，确认原始错误直接传播。
assert.throws(() => {
  using item = { [Symbol.dispose]() {} };
  throw new Error("body only");
}, /body only/);
// 单独比较正文失败与仅释放失败，确认原始错误直接传播。
assert.throws(() => {
  using item = { [Symbol.dispose]() { throw new Error("dispose only"); } };
}, /dispose only/);

// 两个释放器都故意抛错：记录释放次序，再从外向内检查复合错误。
const released = [];
assert.throws(() => {
  using first = { [Symbol.dispose]() { released.push("first"); throw new Error("first cleanup"); } };
  using second = { [Symbol.dispose]() { released.push("second"); throw new Error("second cleanup"); } };
  throw new Error("body");
}, (error) => {
  // error 是较晚出现的释放错误；suppressed 保留此前正在传播的错误。
  assert.ok(error instanceof SuppressedError);
  assert.equal(error.error.message, "first cleanup");
  assert.ok(error.suppressed instanceof SuppressedError);
  assert.equal(error.suppressed.error.message, "second cleanup");
  assert.equal(error.suppressed.suppressed.message, "body");
  return true;
});
assert.deepEqual(released, ["second", "first"]);
console.log("sync error chain first/second/body"); // → sync error chain first/second/body

// 异步资源用相同的对照：await rejects 等待正文和释放都结束。
async function failAsync() {
  await using item = { async [Symbol.asyncDispose]() {
    await Promise.resolve();
    throw new Error("async cleanup");
  } };
  throw new Error("async body");
}
await assert.rejects(failAsync(), (error) => {
  // error 是较晚出现的释放错误；suppressed 保留此前正在传播的错误。
  assert.ok(error instanceof SuppressedError);
  assert.equal(error.error.message, "async cleanup");
  assert.equal(error.suppressed.message, "async body");
  return true;
});
assert.throws(() => { using invalid = {}; }, TypeError);
console.log("async error chain cleanup/body"); // → async error chain cleanup/body

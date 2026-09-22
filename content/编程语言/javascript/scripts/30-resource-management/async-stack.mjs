// 所属章节：30-显式资源管理
// 演示知识点：AsyncDisposableStack 逆序等待释放与幂等 disposeAsync
// 运行命令：node scripts/30-resource-management/async-stack.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 defer start,defer end,adopt:token,resource start,resource end
import assert from "node:assert/strict";
const events = [];
const stack = new AsyncDisposableStack();
// 依次登记资源、带值的清理和无参数清理；释放时顺序反过来。
stack.use({ async [Symbol.asyncDispose]() {
  events.push("resource start");
  await Promise.resolve();
  events.push("resource end");
} });
stack.adopt("token", async (value) => {
  events.push(`adopt:${value}`);
  await Promise.resolve();
});
stack.defer(async () => {
  events.push("defer start");
  await Promise.resolve();
  events.push("defer end");
});
// 等待整个释放链，再次调用用于观察不会重复执行清理。
await stack.disposeAsync();
await stack.disposeAsync();
assert.equal(stack.disposed, true);
assert.deepEqual(events, ["defer start", "defer end", "adopt:token", "resource start", "resource end"]);
console.log(events.join(",")); // → defer start,defer end,adopt:token,resource start,resource end

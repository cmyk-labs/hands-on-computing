// 所属章节：22-async 与 await
// 演示知识点：异步迭代协议、异步生成器与提前触发的清理
// 运行命令：node scripts/22-async-await/iteration.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 page1,closed 与 2,3
import assert from "node:assert/strict";
const events = [];
async function* pages() {
  try {
    yield await Promise.resolve("page1");
    yield await Promise.resolve("page2");
  } finally {
    await Promise.resolve();
    events.push("closed");
  }
}
// 先手动调用协议方法：取一页后 return，确认 finally 完成。
const iterator = pages();
assert.equal(iterator[Symbol.asyncIterator](), iterator);
assert.deepEqual(await iterator.next(), { value: "page1", done: false });
await iterator.return();
assert.deepEqual(await iterator.next(), { value: undefined, done: true });
// 再由 for await 管理迭代；break 提前结束，也会请求关闭生成器。
events.length = 0;
for await (const page of pages()) {
  events.push(page);
  break;
}
console.log(events.join(",")); // → page1,closed
// 同步可迭代对象也可进入 for await；其中的 Promise 值会被等待。
const values = [];
for await (const value of [Promise.resolve(2), 3]) values.push(value);
console.log(values.join(",")); // → 2,3

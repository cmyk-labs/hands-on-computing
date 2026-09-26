// 所属章节：24-自动化测试
// 演示知识点：等待拒绝、mock 调用记录与局部 mock 恢复
// 运行命令：node --test scripts/24-testing/mean.test.mjs scripts/24-testing/async.test.mjs scripts/24-testing/isolation-a.test.mjs scripts/24-testing/isolation-b.test.mjs（工作目录 content/编程语言/javascript）
// 期望结果：三项异步测试通过，拒绝原因与调用次数均匹配
import test from "node:test";
import assert from "node:assert/strict";
import { loadMean } from "./mean.mjs";

test("loadMean: injected reader", async (t) => {
  // 替换读文件边界，固定输入；调用记录用来检查依赖被调用的方式。
  const readText = t.mock.fn(async () => "[2,6]");
  assert.equal(await loadMean(readText), 4);
  assert.equal(readText.mock.callCount(), 1);
  assert.deepEqual(readText.mock.calls[0].arguments, []);
});
// 两种失败来自读取与 JSON 语法；每个 rejects 都要等待。
test("loadMean: read and parse rejection", async () => {
  await assert.rejects(loadMean(async () => { throw new Error("disk failed"); }), /disk failed/);
  await assert.rejects(loadMean(async () => "{"), SyntaxError);
});
test("loadMean: method boundary", async (t) => {
  const reader = { async read() { return "[1]"; } };
  const original = reader.read;
  t.mock.method(reader, "read", async () => "[4,8]");
  assert.equal(await loadMean(() => reader.read()), 6);
  assert.equal(reader.read.mock.callCount(), 1);
  // 在同一测试中恢复，才能直接观察原方法已经重新生效。
  t.mock.restoreAll();
  assert.equal(reader.read, original);
});
// → 三项异步测试均等待完成；拒绝原因和 mock 调用次数都须匹配。

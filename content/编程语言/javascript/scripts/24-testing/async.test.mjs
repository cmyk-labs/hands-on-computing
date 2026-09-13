import test from "node:test";
import assert from "node:assert/strict";
import { loadMean } from "./mean.mjs";

test("loadMean: injected reader", async (t) => {
  const readText = t.mock.fn(async () => "[2,6]");
  assert.equal(await loadMean(readText), 4);
  assert.equal(readText.mock.callCount(), 1);
  assert.deepEqual(readText.mock.calls[0].arguments, []);
});
test("loadMean: read and parse rejection", async () => {
  await assert.rejects(loadMean(async () => { throw new Error("disk failed"); }), /disk failed/);
  await assert.rejects(loadMean(async () => "{"), SyntaxError);
  await assert.rejects(loadMean(async () => "null"), /expected finite numbers/);
});
test("loadMean: method boundary", async (t) => {
  const reader = { async read() { return "[1]"; } };
  const original = reader.read;
  t.mock.method(reader, "read", async () => "[4,8]");
  assert.equal(await loadMean(() => reader.read()), 6);
  assert.equal(reader.read.mock.callCount(), 1);
  t.mock.restoreAll();
  assert.equal(reader.read, original);
});
// → 三项异步测试均等待完成；拒绝原因和 mock 调用次数都须匹配。

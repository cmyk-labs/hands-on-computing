import test from "node:test";
import assert from "node:assert/strict";
test("deliberate mismatch", () => {
  assert.equal(2 + 2, 5); // → AssertionError，运行器报告 fail 1，进程退出 1
});

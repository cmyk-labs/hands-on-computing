// 所属章节：24-自动化测试
// 演示知识点：故意断言失败的独立反例
// 运行命令：node scripts/24-testing/expected-failure.mjs（工作目录 content/编程语言/javascript）
// 期望结果：AssertionError，运行器报告 fail 1，进程退出 1
import test from "node:test";
import assert from "node:assert/strict";
test("deliberate mismatch", () => {
  assert.equal(2 + 2, 5); // → AssertionError，运行器报告 fail 1，进程退出 1
});

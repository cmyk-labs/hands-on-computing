// 所属章节：24-自动化测试
// 演示知识点：第一份验证测试文件间全局状态隔离的测试
// 运行命令：node --test scripts/24-testing/mean.test.mjs scripts/24-testing/async.test.mjs scripts/24-testing/isolation-a.test.mjs scripts/24-testing/isolation-b.test.mjs（工作目录 content/编程语言/javascript）
// 期望结果：断言全局标记初始为 undefined 后设置 A，测试通过
import test from "node:test";
import assert from "node:assert/strict";
test("isolated A", () => {
  assert.equal(globalThis.notebookTestMarker, undefined);
  globalThis.notebookTestMarker = "A";
});

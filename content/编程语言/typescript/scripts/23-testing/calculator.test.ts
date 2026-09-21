// 所属章节：23-自动化测试与类型检查
// 演示知识点：同步值与异常、异步完成与拒绝的行为断言
// 运行命令：npm run run:23（工作目录 content/编程语言/typescript）
// 期望结果：node --test 全部通过
import test from "node:test";
import assert from "node:assert/strict";
import { divide, divideAsync } from "./calculator.js";
test("同步值和异常", () => {
  assert.equal(divide(9, 3), 3);
  assert.equal(divide(0, 3), 0);
  assert.throws(() => divide(1, 0), { name: "RangeError", message: "zero divisor" });
});
test("异步完成和拒绝", async () => {
  assert.equal(await divideAsync(9, 3), 3);
  await assert.rejects(divideAsync(1, 0), { name: "RangeError", message: "zero divisor" });
});
test("每个测试自己创建可变输入", () => {
  const values = [9, 3];
  assert.deepEqual(values.map(value => divide(value, 3)), [3, 1]);
});

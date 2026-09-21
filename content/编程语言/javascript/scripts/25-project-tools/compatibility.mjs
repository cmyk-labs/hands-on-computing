// 所属章节：25-项目组织与工程工具
// 演示知识点：toSorted 与排序拷贝等价、eval 与 Function 的动态作用域差异
// 运行命令：node scripts/25-project-tools/compatibility.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 6、undefined 与 compatibility checked
import assert from "node:assert/strict";
function sortedCopy(values) {
  return [...values].sort((left, right) => left - right);
}
const input = [3, 1, 2];
assert.deepEqual(sortedCopy(input), input.toSorted((left, right) => left - right));
assert.deepEqual(input, [3, 1, 2]);
const localFactor = 3;
console.log(eval("localFactor * 2")); // → 6；这里只执行自己固定写出的代码
console.log(Function("return typeof localFactor")()); // → undefined
const operations = { double: (value) => value * 2 };
assert.equal(operations.double(5), 10);
console.log("compatibility checked"); // → compatibility checked

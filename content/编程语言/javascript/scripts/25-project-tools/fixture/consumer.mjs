// 所属章节：25-项目组织与工程工具
// 演示知识点：以包名导入 fixture、同包 CommonJS 互操作与未导出子路径拒绝
// 运行命令：npm run check:25（工作目录 content/编程语言/javascript）
// 期望结果：输出 exports imports CommonJS checked；number.js 子路径被 ERR_PACKAGE_PATH_NOT_EXPORTED 拒绝
import assert from "node:assert/strict";
import { triple } from "notebook-tools-fixture";
import legacy from "./legacy.cjs";
assert.equal(triple(4), 12);
assert.equal(legacy.label, "CommonJS");
await assert.rejects(import("notebook-tools-fixture/number.js"), {
  code: "ERR_PACKAGE_PATH_NOT_EXPORTED",
});
console.log("exports imports CommonJS checked"); // → exports imports CommonJS checked

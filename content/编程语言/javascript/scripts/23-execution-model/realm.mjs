// 所属章节：23-执行模型与异步调度
// 演示知识点：跨 Realm 数组的构造函数身份与 Array.isArray 判定
// 运行命令：node scripts/23-execution-model/realm.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 false true
import assert from "node:assert/strict";
import vm from "node:vm";
const foreign = vm.runInNewContext("[10, 20]");
assert.equal(foreign instanceof Array, false);
assert.equal(Array.isArray(foreign), true);
console.log(foreign instanceof Array, Array.isArray(foreign)); // → false true

// 所属章节：29-项目引用与编译性能
// 演示知识点：消费 core 构建入口的应用主程序
// 运行命令：npm run run:29（工作目录 content/编程语言/typescript）
// 期望结果：输出 total 10
import assert from "node:assert/strict";
import { total } from "../../core/dist/index.js";
const amount = total([{ price: 4 }, { price: 6 }]);
assert.equal(amount, 10);
console.log("total", amount); // total 10。

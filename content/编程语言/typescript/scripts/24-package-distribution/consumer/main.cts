// 所属章节：24-类型声明生成与包分发
// 演示知识点：安装包的 CommonJS 消费者，经 import = require 使用 legacy 入口
// 运行命令：npm run run:24（工作目录 content/编程语言/typescript）
// 期望结果：输出 CJS installed OK 你好，读者
import greeting = require("notebook-greeting-ts-c");
const result: string = greeting.greet("读者");
if (result !== "你好，读者") throw new Error("CJS result");
console.log("CJS installed OK", result);

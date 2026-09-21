// 所属章节：24-类型声明生成与包分发
// 演示知识点：安装包的 ESM 消费者，核对主入口与 plain 子路径
// 运行命令：npm run run:24（工作目录 content/编程语言/typescript）
// 期望结果：输出 ESM installed OK 欢迎，读者
import { greet, type GreetingOptions } from "notebook-greeting-ts-c";
import { greet as plain } from "notebook-greeting-ts-c/plain";
const options: GreetingOptions = { prefix: "欢迎" };
const result: string = greet("读者", options);
if (result !== "欢迎，读者" || plain("读者") !== "你好，读者") throw new Error("ESM result");
console.log("ESM installed OK", result);

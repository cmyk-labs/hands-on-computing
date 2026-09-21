// 所属章节：24-类型声明生成与包分发
// 演示知识点：安装声明下错误实参的类型反例
// 运行命令：npm run run:24（工作目录 content/编程语言/typescript）
// 期望结果：pack 检查中消费者错误配置退出码 1，含 TS2345；不生成或执行 JavaScript
import { greet } from "notebook-greeting-ts-c";
greet(7);

// 所属章节：24-类型声明生成与包分发
// 演示知识点：安装声明下错误实参的类型反例
// 运行命令：node node_modules/typescript/bin/tsc -p scripts/24-package-distribution/.consumer-errors/tsconfig.errors.json（工作目录 content/编程语言/typescript）；先按正文构建包并准备 .consumer-errors 安装副本
// 期望结果：在已安装依赖的消费者中检查 tsconfig.errors.json 时退出码 1，含 TS2345；不生成或执行 JavaScript
import { greet } from "notebook-greeting-ts-c";
greet(7);

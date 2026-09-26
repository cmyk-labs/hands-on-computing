// 所属章节：25-综合工程实践
// 演示知识点：安装声明下 mapValues 返回类型反例
// 运行命令：node node_modules/typescript/bin/tsc -p scripts/25-data-package/.consumer-errors/tsconfig.errors.json（工作目录 content/编程语言/typescript）；先按正文构建包并准备 .consumer-errors 安装副本
// 期望结果：在已安装依赖的消费者中检查 tsconfig.errors.json 时退出码 1，含 TS2322；不生成或执行 JavaScript
import { mapValues } from "notebook-readings-ts-c";
const texts: string[] = mapValues([1], item => item + 1);

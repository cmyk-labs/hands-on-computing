// 所属章节：20-tsconfig 与项目组织
// 演示知识点：paths 仅在类型层映射、运行时无法解析的模块说明符
// 运行命令：node .build/20-project-config/alias-only.js（工作目录 content/编程语言/typescript）
// 期望结果：退出码 1，报错包含 ERR_MODULE_NOT_FOUND 与 @lesson/value
import { amount } from "@lesson/value";
console.log(amount); // tsc 保留这个说明符；Node 没有同名包。

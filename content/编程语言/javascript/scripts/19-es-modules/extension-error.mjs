// 所属章节：19-ES 模块
// 演示知识点：Node ESM 导入不自动补扩展名的独立反例
// 运行命令：node scripts/19-es-modules/extension-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：ERR_MODULE_NOT_FOUND：Cannot find module，退出状态为 1
import { sum } from "./math";
console.log(sum(1, 2));

// 独立运行：退出状态为 1；诊断包含 ERR_MODULE_NOT_FOUND；Cannot find module。

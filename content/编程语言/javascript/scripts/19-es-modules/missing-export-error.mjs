// 所属章节：19-ES 模块
// 演示知识点：导入不存在的具名导出的独立反例
// 运行命令：node scripts/19-es-modules/missing-export-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：SyntaxError：does not provide an export named 'add'，退出状态为 1
import { add } from "./math.mjs";
console.log(add(1, 2));

// 独立运行：退出状态为 1；诊断包含 SyntaxError；does not provide an export named 'add'。

// 所属章节：19-ES 模块
// 演示知识点：JSON 模块不提供同名字段具名导出的独立反例
// 运行命令：node scripts/19-es-modules/json-named-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：SyntaxError：does not provide an export named 'title'，退出状态为 1
import { title } from "./settings.json" with { type: "json" };
console.log(title);

// 独立运行：退出状态为 1；诊断包含 SyntaxError；does not provide an export named 'title'。

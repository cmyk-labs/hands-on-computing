// 所属章节：19-ES 模块
// 演示知识点：导入绑定不可重新赋值的独立反例
// 运行命令：node scripts/19-es-modules/import-assignment-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：TypeError：Assignment to constant variable，退出状态为 1
import { count } from "./counter.mjs";
count = 10;

// 独立运行：退出状态为 1；诊断包含 TypeError；Assignment to constant variable。

// 所属章节：19-ES 模块
// 演示知识点：循环依赖提供方 A，函数体内延后读取对方导出
// 运行命令：node scripts/19-es-modules/cycle-safe.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，供 cycle-safe.mjs 输出 ABA
import { readB } from "./cycle-b.mjs";
export const a = "A";
export function combined() { return a + readB(); }

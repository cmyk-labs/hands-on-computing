// 所属章节：19-ES 模块
// 演示知识点：循环依赖提供方 B，函数体内延后读取对方导出
// 运行命令：node scripts/19-es-modules/cycle-safe.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，与 cycle-a.mjs 互相引用不报错
import { a } from "./cycle-a.mjs";
export const b = "B";
export function readB() { return b + a; }

// 所属章节：19-ES 模块
// 演示知识点：在循环顶层提前读取对方导出的提供方
// 运行命令：node scripts/19-es-modules/cycle-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，触发入口的暂时性死区错误
import { a } from "./cycle-error.mjs";
export const b = a + "B";

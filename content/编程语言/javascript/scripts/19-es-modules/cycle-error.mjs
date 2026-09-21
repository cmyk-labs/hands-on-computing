// 所属章节：19-ES 模块
// 演示知识点：循环顶层提前读取导致初始化失败的独立反例入口
// 运行命令：node scripts/19-es-modules/cycle-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：ReferenceError：Cannot access 'a' before initialization，退出状态为 1
import { b } from "./cycle-bad-b.mjs";
export const a = "A";
console.log(b);

// 独立运行：退出状态为 1；诊断包含 ReferenceError；Cannot access 'a' before initialization。

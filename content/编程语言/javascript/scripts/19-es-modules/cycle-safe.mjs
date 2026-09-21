// 所属章节：19-ES 模块
// 演示知识点：循环双方完成初始化后再互相调用
// 运行命令：node scripts/19-es-modules/cycle-safe.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 ABA
import { combined } from "./cycle-a.mjs";
console.log(combined());

// 按本例输入运行，输出依次为：
// ABA

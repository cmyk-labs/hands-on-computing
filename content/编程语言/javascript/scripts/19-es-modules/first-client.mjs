// 所属章节：19-ES 模块
// 演示知识点：第一条依赖路径，导入副作用模块并导出值
// 运行命令：node scripts/19-es-modules/side-effects.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，经 side-effects.mjs 参与输出 甲乙
import "./registration.mjs";
export const first = "甲";

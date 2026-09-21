// 所属章节：19-ES 模块
// 演示知识点：第二条依赖路径，与第一条共享同一副作用模块
// 运行命令：node scripts/19-es-modules/side-effects.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，两条路径只触发一次 注册模块 打印
import "./registration.mjs";
export const second = "乙";

// 所属章节：19-ES 模块
// 演示知识点：两条依赖路径共享一次模块求值
// 运行命令：node scripts/19-es-modules/side-effects.mjs（工作目录 content/编程语言/javascript）
// 期望结果：依次输出 注册模块、入口主体、甲乙
console.log("入口主体");
import { first } from "./first-client.mjs";
import { second } from "./second-client.mjs";
console.log(first + second);

// 按本例输入运行，输出依次为：
// 注册模块
// 入口主体
// 甲乙

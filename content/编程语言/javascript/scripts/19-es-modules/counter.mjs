// 所属章节：19-ES 模块
// 演示知识点：可变 let 导出、导出对象与默认导出快照表达式的提供方
// 运行命令：node scripts/19-es-modules/live-bindings.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，供实时绑定与命名空间示例读取、修改
export let count = 0;
export const settings = { title: "JS" };
export function increment() { count += 1; }
export default count;

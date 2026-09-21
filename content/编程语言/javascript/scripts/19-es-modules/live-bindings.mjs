// 所属章节：19-ES 模块
// 演示知识点：导入绑定读取实时值与修改导出对象属性
// 运行命令：node scripts/19-es-modules/live-bindings.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 0 0 与 0 1 模块
import snapshot, { count, increment, settings } from "./counter.mjs";
console.log(snapshot, count);
increment();
settings.title = "模块";
console.log(snapshot, count, settings.title);

// 按本例输入运行，输出依次为：
// 0 0
// 0 1 模块

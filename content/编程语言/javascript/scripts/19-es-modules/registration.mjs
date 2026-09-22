// 所属章节：19-ES 模块
// 演示知识点：模块顶层副作用的可观察打印
// 运行命令：node scripts/19-es-modules/side-effects.mjs（工作目录 content/编程语言/javascript）
// 期望结果：被导入时打印 注册模块，先于入口主体输出
console.log("注册模块"); // → 注册模块；同一模块实例被两处导入时只打印一次。

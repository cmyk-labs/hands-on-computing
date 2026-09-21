// 所属章节：19-ES 模块
// 演示知识点：模块自动启用严格模式、禁止意外创建全局变量的独立反例
// 运行命令：node scripts/19-es-modules/strict-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：ReferenceError：undeclaredLessonTotal is not defined，退出状态为 1
undeclaredLessonTotal = 3;

// 独立运行：退出状态为 1；诊断包含 ReferenceError；undeclaredLessonTotal is not defined。

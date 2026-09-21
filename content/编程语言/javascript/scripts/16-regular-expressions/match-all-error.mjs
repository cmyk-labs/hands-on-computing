// 所属章节：16-正则表达式
// 演示知识点：matchAll 缺少 g 标志的独立反例
// 运行命令：node scripts/16-regular-expressions/match-all-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError（non-global RegExp），退出状态为 1
"JS TS".matchAll(/[A-Z]+/);

// 独立运行：退出状态为 1；诊断包含 TypeError；non-global RegExp。

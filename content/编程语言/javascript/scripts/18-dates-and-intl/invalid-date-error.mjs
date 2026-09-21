// 所属章节：18-日期、时间与国际化
// 演示知识点：无效日期调用 toISOString 抛错的独立反例
// 运行命令：node scripts/18-dates-and-intl/invalid-date-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：RangeError：Invalid time value，退出状态为 1
new Date(NaN).toISOString();

// 独立运行：退出状态为 1；诊断包含 RangeError；Invalid time value。

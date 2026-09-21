// 所属章节：18-日期、时间与国际化
// 演示知识点：时长字段混合正负号抛错的独立反例
// 运行命令：node scripts/18-dates-and-intl/duration-sign-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：RangeError：Invalid object，退出状态为 1
new Intl.DurationFormat("en").format({ hours: 1, minutes: -2 });

// 独立运行：退出状态为 1；诊断包含 RangeError；Invalid object。

new Intl.DurationFormat("en").format({ hours: 1, minutes: -2 });

// 独立运行：退出状态为 1；诊断包含 RangeError；Invalid object。

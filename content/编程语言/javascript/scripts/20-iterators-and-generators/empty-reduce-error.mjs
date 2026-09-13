Iterator.from([]).reduce((sum, value) => sum + value);

// 独立运行：退出状态为 1；诊断包含 TypeError；Reduce of a done iterator with no initial value。

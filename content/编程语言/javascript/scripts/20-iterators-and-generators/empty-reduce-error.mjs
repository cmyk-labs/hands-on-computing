// 所属章节：20-迭代器与生成器
// 演示知识点：空迭代器 reduce 缺少初始值的独立反例
// 运行命令：node scripts/20-iterators-and-generators/empty-reduce-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：TypeError：Reduce of a done iterator with no initial value，退出状态为 1
Iterator.from([]).reduce((sum, value) => sum + value);

// 独立运行：退出状态为 1；诊断包含 TypeError；Reduce of a done iterator with no initial value。

// 所属章节：20-迭代器与生成器
// 演示知识点：flatMap 回调返回原始字符串被拒绝的独立反例
// 运行命令：node scripts/20-iterators-and-generators/flat-map-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：TypeError：called on non-object，退出状态为 1
Iterator.from([1]).flatMap(() => "JS").toArray();

// 独立运行：退出状态为 1；诊断包含 TypeError；called on non-object。

// 所属章节：20-迭代器与生成器
// 演示知识点：next 返回原始值违反迭代器协议的独立反例
// 运行命令：node scripts/20-iterators-and-generators/iterator-result-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：TypeError：Iterator result 7 is not an object，退出状态为 1
const broken = {
  [Symbol.iterator]() { return this; },
  next() { return 7; }
};
console.log([...broken]);

// 独立运行：退出状态为 1；诊断包含 TypeError；Iterator result 7 is not an object。

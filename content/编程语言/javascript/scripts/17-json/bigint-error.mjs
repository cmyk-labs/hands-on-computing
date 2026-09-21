// 所属章节：17-JSON 与数据转换
// 演示知识点：默认序列化 BigInt 抛错的独立反例
// 运行命令：node scripts/17-json/bigint-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：TypeError：Do not know how to serialize a BigInt，退出状态为 1
JSON.stringify({ id: 1n });

// 独立运行：退出状态为 1；诊断包含 TypeError；Do not know how to serialize a BigInt。

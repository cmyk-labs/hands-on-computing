// 所属章节：17-JSON 与数据转换
// 演示知识点：尾随逗号导致 JSON.parse 失败的独立反例
// 运行命令：node scripts/17-json/invalid-json-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：SyntaxError：Expected double-quoted property name，退出状态为 1
JSON.parse('{"minutes":30,}');

// 独立运行：退出状态为 1；诊断包含 SyntaxError；Expected double-quoted property name。

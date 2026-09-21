// 所属章节：17-JSON 与数据转换
// 演示知识点：循环引用导致序列化失败的独立反例
// 运行命令：node scripts/17-json/cycle-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：TypeError：Converting circular structure to JSON，退出状态为 1
const record = { title: "JS" };
record.self = record;
JSON.stringify(record);

// 独立运行：退出状态为 1；诊断包含 TypeError；Converting circular structure to JSON。

const record = { title: "JS" };
record.self = record;
JSON.stringify(record);

// 独立运行：退出状态为 1；诊断包含 TypeError；Converting circular structure to JSON。

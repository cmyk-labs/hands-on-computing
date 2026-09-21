// 所属章节：11-Map 与 Set
// 演示知识点：用 Map 按编号合并记录、用 Set 统计唯一编号
// 运行命令：node scripts/11-map-and-set/choose-container.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
const records = [{ id: "a", minutes: 10 }, { id: "b", minutes: 20 }, { id: "a", minutes: 30 }];
const byId = new Map();
for (const record of records) byId.set(record.id, record);
const latest = [...byId.values()];
console.log(latest.map(record => record.id + ":" + record.minutes).join(","));
console.log(new Set(records.map(record => record.id)).size);

// 按本例输入运行，输出依次为：
// a:30,b:20
// 2

const records = [{ id: "a", minutes: 10 }, { id: "b", minutes: 20 }, { id: "a", minutes: 30 }];
const byId = new Map();
for (const record of records) byId.set(record.id, record);
const latest = [...byId.values()];
console.log(latest.map(record => record.id + ":" + record.minutes).join(","));
console.log(new Set(records.map(record => record.id)).size);

// 按本例输入运行，输出依次为：
// a:30,b:20
// 2

const start = new Date("2025-01-31T00:00:00Z");
const oneDayLater = new Date(start.getTime() + 86_400_000);
console.log((oneDayLater - start) / 3_600_000);
const overflow = new Date(start);
overflow.setUTCMonth(1);
console.log(overflow.toISOString());
const clamped = new Date(start);
const originalDay = clamped.getUTCDate();
clamped.setUTCDate(1);
clamped.setUTCMonth(clamped.getUTCMonth() + 1);
const lastDay = new Date(Date.UTC(clamped.getUTCFullYear(),
  clamped.getUTCMonth() + 1, 0)).getUTCDate();
clamped.setUTCDate(Math.min(originalDay, lastDay));
console.log(clamped.toISOString(), start.toISOString());

// 按本例输入运行，输出依次为：
// 24
// 2025-03-03T00:00:00.000Z
// 2025-02-28T00:00:00.000Z 2025-01-31T00:00:00.000Z

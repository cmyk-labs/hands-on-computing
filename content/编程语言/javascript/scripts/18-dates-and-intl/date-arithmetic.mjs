// 所属章节：18-日期、时间与国际化
// 演示知识点：毫秒时长加减、setUTCMonth 溢出与月底日期截断
// 运行命令：node scripts/18-dates-and-intl/date-arithmetic.mjs（工作目录 content/编程语言/javascript）
// 期望结果：经过 24 小时；溢出得到 2025-03-03，手动截断得 2025-02-28
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

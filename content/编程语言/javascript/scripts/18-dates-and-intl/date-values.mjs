// 所属章节：18-日期、时间与国际化
// 演示知识点：时间戳、Date.UTC 构造、两位年份映射与无效日期判定
// 运行命令：node scripts/18-dates-and-intl/date-values.mjs（工作目录 content/编程语言/javascript）
// 期望结果：首行输出 1970-01-01T00:00:00.000Z 0；两个无效日期的 getTime 均为 NaN
const epoch = new Date(0);
console.log(epoch.toISOString(), epoch.getTime());
const start = new Date(Date.UTC(2025, 0, 2, 3, 4, 5));
console.log(start.toISOString());
console.log(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
console.log(new Date(Date.UTC(25, 0, 1)).getUTCFullYear());
console.log(Number.isNaN(new Date(NaN).getTime()));
console.log(Number.isNaN(new Date(8640000000000001).getTime()));

// 按本例输入运行，输出依次为：
// 1970-01-01T00:00:00.000Z 0
// 2025-01-02T03:04:05.000Z
// 2025 0 2
// 1925
// true
// true

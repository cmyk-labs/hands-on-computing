// 所属章节：18-日期、时间与国际化
// 演示知识点：Intl.DateTimeFormat 固定时区格式化与 formatToParts 部件
// 运行命令：node scripts/18-dates-and-intl/date-format.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 02/01/2025 与部件拼成的 2025-01-02
const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC", calendar: "gregory", numberingSystem: "latn",
  year: "numeric", month: "2-digit", day: "2-digit"
});
const date = new Date("2025-01-02T03:04:05Z");
console.log(format.format(date));
const parts = format.formatToParts(date);
console.log(["year", "month", "day"].map(type =>
  parts.find(part => part.type === type).value).join("-"));

// 按本例输入运行，输出依次为：
// 02/01/2025
// 2025-01-02

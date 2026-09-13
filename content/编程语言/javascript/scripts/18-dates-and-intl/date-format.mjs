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

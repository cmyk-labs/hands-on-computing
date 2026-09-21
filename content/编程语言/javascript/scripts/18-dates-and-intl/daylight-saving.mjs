// 所属章节：18-日期、时间与国际化
// 演示知识点：跨夏令时切换的钟面显示与实际经过时间
// 运行命令：node scripts/18-dates-and-intl/daylight-saving.mjs（工作目录 content/编程语言/javascript）
// 期望结果：相隔一小时显示 01:30 与 03:30，时间差仍为 60 分钟
const before = new Date("2025-03-09T06:30:00Z");
const after = new Date("2025-03-09T07:30:00Z");
const clock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "America/New_York", hourCycle: "h23",
  hour: "2-digit", minute: "2-digit"
});
console.log(clock.format(before), clock.format(after));
console.log((after - before) / 60_000);

// 按本例输入运行，输出依次为：
// 01:30 03:30
// 60

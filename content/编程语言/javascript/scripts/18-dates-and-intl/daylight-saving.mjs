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

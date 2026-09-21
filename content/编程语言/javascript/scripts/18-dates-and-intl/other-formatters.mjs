// 所属章节：18-日期、时间与国际化
// 演示知识点：ListFormat、RelativeTimeFormat、DisplayNames 与 DurationFormat
// 运行命令：node scripts/18-dates-and-intl/other-formatters.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 Map, Set, and Date、yesterday in 3 days、China 与 1:02:03
console.log(new Intl.ListFormat("en", {
  style: "long", type: "conjunction"
}).format(["Map", "Set", "Date"]));
const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
console.log(relative.format(-1, "day"), relative.format(3, "day"));
console.log(new Intl.DisplayNames("en", { type: "region" }).of("CN"));
console.log(new Intl.DurationFormat("en", {
  style: "digital"
}).format({ hours: 1, minutes: 2, seconds: 3 }));

// 按本例输入运行，输出依次为：
// Map, Set, and Date
// yesterday in 3 days
// China
// 1:02:03

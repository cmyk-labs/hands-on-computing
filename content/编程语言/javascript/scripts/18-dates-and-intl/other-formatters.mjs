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

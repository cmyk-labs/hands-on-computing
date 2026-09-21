// 所属章节：18-日期、时间与国际化
// 演示知识点：百分比、货币与单位三种数值格式
// 运行命令：node scripts/18-dates-and-intl/number-format.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 12.5%、$1,234.50 与 2 kilometers
const percent = new Intl.NumberFormat("en-US", {
  style: "percent", maximumFractionDigits: 1
});
console.log(percent.format(0.125));
console.log(new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD"
}).format(1234.5));
console.log(new Intl.NumberFormat("en-US", {
  style: "unit", unit: "kilometer", unitDisplay: "long"
}).format(2));

// 按本例输入运行，输出依次为：
// 12.5%
// $1,234.50
// 2 kilometers

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

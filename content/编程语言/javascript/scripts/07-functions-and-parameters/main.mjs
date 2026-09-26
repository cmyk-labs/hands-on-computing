// 所属章节：07-函数与参数
// 演示知识点：声明与表达式、默认参数与 rest、arguments、箭头函数、参数按值传递、回调与 IIFE、递归、标签模板
// 运行命令：node scripts/07-functions-and-parameters/main.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各片段示例值，与行内注释一致
function rectangleArea(width, height) {
  return width * height;
}
const add = function (left, right) {
  return left + right;
};
function finish() {
  return;
}
function noReturn() {
  const result = 4;
}
console.log(rectangleArea(4, 3), add(4, 3), finish(), noReturn());
function lineBreak() {
  return
  10;
}
console.log(lineBreak());
// 输出依次为：
// 12 7 undefined undefined
// undefined

function total(price, quantity = 1, subtotal = price * quantity) {
  return subtotal;
}
console.log(total(8), total(8, undefined), total(8, null), total(8, 0));
function fresh(options = { count: 0 }) {
  options.count += 1;
  return options.count;
}
console.log(fresh(), fresh());
function missing(value) {
  return value;
}
console.log(missing());
// 输出依次为：
// 8 8 0 0
// 1 1
// undefined

function sum(first = 0, ...others) {
  let result = first;
  for (const value of others) result += value;
  return result;
}
console.log(sum(), sum(2, 3, 4));
const numbers = [2, 3, 4];
console.log(sum(...numbers), Array.isArray(numbers));
function restKind(...values) {
  return Array.isArray(values);
}
console.log(restKind(1, 2));
// 输出依次为：
// 0 9
// 9 true
// true

function inspect(first) {
  first = 99;
  return `${first}:${arguments[0]}:${arguments.length}:${Array.isArray(arguments)}`;
}
console.log(inspect(4, 5));
const double = value => value * 2;
const makeRecord = value => ({ value });
const blockBody = value => { value * 2; };
console.log(double(5), makeRecord(3).value, blockBody(5));
function outer(value) {
  const readOuterArguments = () => arguments[0];
  return readOuterArguments(99);
}
console.log(outer("外层实参"));
// 输出依次为：
// 99:4:2:false
// 10 3 undefined
// 外层实参

function revise(number, item) {
  number = 100;
  item.score = 90;
  item = { score: 0 };
  return `${number}:${item.score}`;
}
const originalNumber = 5;
const report = { score: 80 };
console.log(revise(originalNumber, report));
console.log(originalNumber, report.score);
// 输出依次为：
// 100:0
// 5 90

function applyTwice(value, transform) {
  return transform(transform(value));
}
function increment(value) {
  return value + 1;
}
console.log(applyTwice(3, increment));
const configured = (function (prefix) {
  const suffix = "ready";
  return `${prefix}:${suffix}`;
})("job");
console.log(configured);
// 输出依次为：
// 5
// job:ready

function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(0), factorial(5));
// 输出依次为：
// 1 120

function inspectTemplate(parts, ...values) {
  return `${parts.length}:${values.length}:${typeof values[0]}:${parts[0].length}:${parts.raw[0].length}`;
}
console.log(inspectTemplate`A\n${3}!`);
function numberOnly(parts, value) {
  return value * 2;
}
console.log(numberOnly`amount=${6}`);
// 输出依次为：
// 2:1:number:2:3
// 12

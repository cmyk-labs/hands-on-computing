// 所属章节：08-作用域、闭包与高阶函数
// 演示知识点：词法作用域与 var/let 边界、声明提升与暂时性死区、闭包捕获、高阶函数与组合、循环中的闭包
// 运行命令：node scripts/08-scope-closures-and-higher-order-functions/main.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各片段示例值，与行内注释一致
const moduleTitle = "模块";
var moduleLegacy = 1;
function showScope(parameter) {
  let label = "函数";
  {
    const label = "块";
    var retained = parameter;
    console.log(label);
  }
  console.log(label, retained, moduleTitle);
}
showScope("参数");
console.log(Object.hasOwn(globalThis, "moduleTitle"), Object.hasOwn(globalThis, "moduleLegacy"));
console.log(globalThis.Math === Math);
// 输出依次为：
// 块
// 函数 参数 模块
// false false
// true

const place = "定义位置";
function readPlace() {
  return place;
}
function invoke(reader) {
  const place = "调用位置";
  return reader();
}
console.log(invoke(readPlace));
// 输出依次为：
// 定义位置

console.log(declared(3));
function declared(value) {
  return value + 1;
}
console.log(legacy);
var legacy = 5;
console.log(legacy);
const expression = function (value) {
  return value + 2;
};
console.log(expression(3), typeof neverDeclaredInThisExample);
// 输出依次为：
// 4
// undefined
// 5
// 5 undefined

function makeCounter(start) {
  let count = start;
  return function () {
    count += 1;
    return count;
  };
}
const first = makeCounter(0);
const second = makeCounter(10);
console.log(first(), first(), second(), first());
let current = "旧值";
const readCurrent = () => current;
current = "新值";
console.log(readCurrent());
// 输出依次为：
// 1 2 11 3
// 新值

function makeScale(factor) {
  return value => value * factor;
}
function apply(value, operation) {
  return operation(value);
}
const triple = makeScale(3);
console.log(apply(4, triple), triple(5));
// 输出依次为：
// 12 15

function compose(outer, inner) {
  return value => outer(inner(value));
}
const addOne = value => value + 1;
const timesTwo = value => value * 2;
console.log(compose(timesTwo, addOne)(3), compose(addOne, timesTwo)(3));
let calls = 0;
function countedDouble(value) {
  calls += 1;
  return value * 2;
}
console.log(countedDouble(3), countedDouble(3), calls);
// 输出依次为：
// 8 7
// 6 6 2

const withVar = [];
for (var i = 0; i < 3; i += 1) {
  withVar.push(() => i);
}
const withLet = [];
for (let index = 0; index < 3; index += 1) {
  withLet.push(() => index);
}
console.log(withVar[0](), withVar[1](), withVar[2]());
console.log(withLet[0](), withLet[1](), withLet[2]());
const shared = { count: 0 };
const readShared = () => shared.count;
shared.count = 9;
console.log(readShared());
// 输出依次为：
// 3 3 3
// 0 1 2
// 9

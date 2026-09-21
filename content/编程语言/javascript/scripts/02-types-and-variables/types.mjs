// 所属章节：02-类型与变量
// 演示知识点：typeof 与基本类型、声明方式差异、动态类型与对象引用
// 运行命令：node scripts/02-types-and-variables/types.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
console.log(typeof undefined); // undefined
console.log(typeof null); // object：历史遗留结果，null 仍是原始值
console.log(typeof true); // boolean
console.log(typeof 12.5); // number
console.log(typeof 12n); // bigint
console.log(typeof "课程"); // string
console.log(typeof Symbol("id")); // symbol
console.log(typeof { title: "课程" }); // object

console.log(typeof []); // object：数组属于对象
console.log(Array.isArray([])); // true：专门判断是否为数组
console.log(typeof console.log); // function：可调用对象的特殊标签

let progress;
console.log(progress); // undefined：已声明，但没有给定初始值
progress = 1;
progress = 2;
const courseName = "JavaScript";
console.log(progress, courseName); // 2 JavaScript

let status = "外层";
{
  let status = "内层";
  var legacyCount = 1;
  console.log(status); // 内层：访问当前块中的名称
}
console.log(status); // 外层：是另一个变量
console.log(legacyCount); // 1：var 不以这个块作为作用域边界

var retryCount = 1;
var retryCount = 2; // 同一作用域中可以再次用 var 声明这个 var 名称
console.log(retryCount); // 2

let result = 20;
console.log(typeof result); // number
result = "完成";
console.log(typeof result); // string：同一个变量可以改为保存另一种类型的值

let originalText = "hello";
let copiedText = originalText;
copiedText = copiedText.toUpperCase(); // 返回转换后的新字符串
console.log(originalText, copiedText); // hello HELLO

const report = { score: 80 };
const alias = report; // 两个变量引用同一个对象
alias.score = 90;
console.log(report.score); // 90：通过另一名称修改了同一个对象
console.log(report === alias); // true：比较的是对象身份
console.log(report === { score: 90 }); // false：这是另一个新对象

console.log(earlyCount); // undefined：var 声明已建立，赋值尚未执行
var earlyCount = 3;
console.log(earlyCount); // 3
console.log(typeof notDeclaredAnywhere); // undefined：这个名称没有声明

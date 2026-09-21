// 所属章节：01-运行与代码书写
// 演示知识点：控制台输出、Node 与浏览器宿主差异、const 命名与分号省略
// 运行命令：node scripts/01-running-and-writing/basics.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
console.log("你好，JavaScript"); // 你好，JavaScript
console.log(1 + 2); // 3
console.error("提示：请先保存文件"); // Node.js 中写入标准错误流；这里没有抛出异常

console.log(globalThis.console === console); // true：这里访问的是同一个 console
console.log(typeof document); // Node.js：undefined；本章浏览器页面：object

// const 为值声明一个名称；变量的完整规则见“类型与变量”。
const unitPrice = 12;
const quantity = 2;
/* 两个名称分别表示单价和数量，* 表示乘法。 */
console.log(unitPrice * quantity); // 24

// 这里省略分号，三个语句仍可以分别结束。
const price = 12
const amount = 2
console.log(price * amount) // 24

// 换行后仍可接着做加法，因此这两行属于同一个初始化表达式。
const total = 1
+ 2;
console.log(total); // 3

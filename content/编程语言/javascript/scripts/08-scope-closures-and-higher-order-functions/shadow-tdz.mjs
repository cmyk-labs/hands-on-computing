// 所属章节：08-作用域、闭包与高阶函数
// 演示知识点：内层声明的名称在整个块内遮蔽外层，初始化前读取会失败
// 运行命令：node scripts/08-scope-closures-and-higher-order-functions/shadow-tdz.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 ReferenceError（Cannot access 'title' before initialization）并以非零状态退出
const title = "外层";
{
  console.log(typeof title);
  let title = "内层";
}
// 预期错误：ReferenceError；Cannot access 'title' before initialization

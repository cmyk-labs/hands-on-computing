// 所属章节：15-异常处理与调试
// 演示知识点：debugger 语句在连接调试器时暂停（正文另用 node inspect 检查变量）
// 运行命令：node scripts/15-errors-and-debugging/debugger.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 36；未连接调试器时 debugger 语句不产生额外输出
function multiply(unitPrice, quantity) {
  const total = unitPrice * quantity;
  debugger;
  return total;
}
console.log(multiply(12, 3));

// 按本例输入运行，输出依次为：
// 36

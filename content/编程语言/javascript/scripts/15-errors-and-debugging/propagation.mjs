// 所属章节：15-异常处理与调试
// 演示知识点：异常沿调用栈同步传播、catch 重新抛出与 finally 清理
// 运行命令：node scripts/15-errors-and-debugging/propagation.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
const events = [];
function inner() { throw new RangeError("数量不足"); }
function middle() {
  try { inner(); }
  catch (error) { events.push("middle"); throw error; }
  finally { events.push("finally"); }
}
try { middle(); }
catch (error) {
  if (!(error instanceof RangeError) || error.message !== "数量不足") throw error;
  events.push("outer:" + error.name);
}
console.log(events.join(","));
function complete() {
  try { return "结果"; }
  finally { events.push("返回前清理"); }
}
console.log(complete(), events.at(-1));

// 按本例输入运行，输出依次为：
// middle,finally,outer:RangeError
// 结果 返回前清理

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

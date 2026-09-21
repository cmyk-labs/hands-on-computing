// 所属章节：23-执行模型与异步调度
// 演示知识点：调用栈先执行完毕、Promise 反应随后入队
// 运行命令：node scripts/23-execution-model/stack.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 outer before,inner,outer after,script after,reaction
const events = [];
function inner() { events.push("inner"); }
function outer() {
  events.push("outer before");
  Promise.resolve().then(() => {
    events.push("reaction");
    console.log(events.join(",")); // → outer before,inner,outer after,script after,reaction
  });
  inner();
  events.push("outer after");
}
outer();
events.push("script after");

// 所属章节：15-异常处理与调试
// 演示知识点：收集操作与清理错误并用 AggregateError 聚合
// 运行命令：node scripts/15-errors-and-debugging/preserve-errors.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
function execute(operation, cleanup) {
  const errors = [];
  try { operation(); } catch (error) { errors.push(error); }
  try { cleanup(); } catch (error) { errors.push(error); }
  if (errors.length === 1) throw errors[0];
  if (errors.length > 1) throw new AggregateError(errors, "操作和清理均失败");
}
try {
  execute(() => { throw new Error("operation failed"); },
          () => { throw new Error("cleanup failed"); });
} catch (error) {
  console.log(error.name, error.message);
  console.log(error.errors.map(item => item.message).join(","));
}

// 按本例输入运行，输出依次为：
// AggregateError 操作和清理均失败
// operation failed,cleanup failed

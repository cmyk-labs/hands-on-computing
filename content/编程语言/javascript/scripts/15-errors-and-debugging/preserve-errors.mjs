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
  if (!(error instanceof AggregateError)) throw error;
  console.log(error.name, error.message);
  console.log(error.errors.map(item => item.message).join(","));
}

// 按本例输入运行，输出依次为：
// AggregateError 操作和清理均失败
// operation failed,cleanup failed

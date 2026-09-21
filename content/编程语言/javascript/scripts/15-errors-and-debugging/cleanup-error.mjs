// 所属章节：15-异常处理与调试
// 演示知识点：finally 中抛出的错误覆盖 try 原错误的独立反例
// 运行命令：node scripts/15-errors-and-debugging/cleanup-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：退出状态为 1，诊断包含 Error: cleanup failed（清理错误覆盖原错误）
try {
  throw new Error("operation failed");
} finally {
  throw new Error("cleanup failed");
}

// 独立运行：退出状态为 1；诊断包含 Error: cleanup failed。

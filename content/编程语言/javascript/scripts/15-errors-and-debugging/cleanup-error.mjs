try {
  throw new Error("operation failed");
} finally {
  throw new Error("cleanup failed");
}

// 独立运行：退出状态为 1；诊断包含 Error: cleanup failed。

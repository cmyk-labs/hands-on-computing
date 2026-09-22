// 所属章节：30-显式资源管理
// 演示知识点：未捕获复合异常的独立反例
// 运行命令：node scripts/30-resource-management/uncaught.mjs（工作目录 content/编程语言/javascript）
// 期望结果：进程退出 1，诊断含 SuppressedError、DISPOSE_FAILURE 与 BODY_FAILURE
try {
  using item = { [Symbol.dispose]() { throw new Error("DISPOSE_FAILURE"); } };
  throw new Error("BODY_FAILURE");
} catch (error) {
  console.error(error.error.message, error.suppressed.message); // stderr 首行：DISPOSE_FAILURE BODY_FAILURE
  throw error;
}
// → Node.js 退出 1；诊断同时含 SuppressedError、DISPOSE_FAILURE、BODY_FAILURE

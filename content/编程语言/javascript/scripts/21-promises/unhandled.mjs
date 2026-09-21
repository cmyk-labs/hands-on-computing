// 所属章节：21-Promise
// 演示知识点：strict 模式下未处理拒绝导致进程失败的独立反例
// 运行命令：node --unhandled-rejections=strict scripts/21-promises/unhandled.mjs（工作目录 content/编程语言/javascript）
// 期望结果：退出状态为 1，诊断包含 Error: UNHANDLED_DEMO
Promise.resolve().then(() => {
  throw new Error("UNHANDLED_DEMO"); // → strict 模式下退出状态为 1，诊断包含 Error: UNHANDLED_DEMO
});

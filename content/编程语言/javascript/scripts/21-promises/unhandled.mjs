Promise.resolve().then(() => {
  throw new Error("UNHANDLED_DEMO"); // → strict 模式下退出状态为 1，诊断包含 Error: UNHANDLED_DEMO
});

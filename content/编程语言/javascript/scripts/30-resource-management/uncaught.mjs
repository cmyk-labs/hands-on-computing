try {
  using item = { [Symbol.dispose]() { throw new Error("DISPOSE_FAILURE"); } };
  throw new Error("BODY_FAILURE");
} catch (error) {
  console.error(error.error.message, error.suppressed.message);
  throw error;
}
// → Node.js 退出 1；诊断同时含 SuppressedError、DISPOSE_FAILURE、BODY_FAILURE

// 所属章节：22-async 与 await
// 演示知识点：有限并发 mapLimited 的实现：固定窗口、失败排空与结果保序
// 运行命令：node scripts/22-async-await/limited-demo.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，行为由 limited-demo.mjs 断言
export async function mapLimited(items, limit, worker) {
  if (!Number.isInteger(limit) || limit < 1) throw new RangeError("limit must be positive");
  const results = new Array(items.length);
  let nextIndex = 0;
  let failed = false;
  let firstError;
  async function consume() {
    while (!failed && nextIndex < items.length) {
      const index = nextIndex++;
      try {
        results[index] = await worker(items[index]);
      } catch (error) {
        if (!failed) { failed = true; firstError = error; }
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, consume));
  if (failed) throw firstError;
  return results;
}

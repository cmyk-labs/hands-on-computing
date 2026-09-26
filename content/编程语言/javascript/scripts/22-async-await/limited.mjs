// 所属章节：22-async 与 await
// 演示知识点：有限并发 mapLimited 的实现：固定窗口、失败排空与结果保序
// 运行命令：node scripts/22-async-await/limited-demo.mjs（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，行为由 limited-demo.mjs 断言
export async function mapLimited(items, limit, worker) {
  // 本例约定 limit 是正整数，不增加入口检查。
  // 结果按输入下标保存，完成顺序不会打乱返回数组。
  const results = new Array(items.length);
  let next = 0;
  let failed = false;
  let firstError;
  async function consume() {
    while (!failed && next < items.length) {
      // 在 await 前领取唯一索引；多个消费者共享 next，不重复领取。
      const index = next++;
      try {
        results[index] = await worker(items[index]);
      } catch (error) {
        // 记住首个失败并停止领取新任务；已开始的任务仍由各消费者等待。
        if (!failed) { failed = true; firstError = error; }
      }
    }
  }
  // 固定数量的消费者循环取任务；先等待已启动任务结束，再向外抛错。
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, consume));
  if (failed) throw firstError;
  return results;
}

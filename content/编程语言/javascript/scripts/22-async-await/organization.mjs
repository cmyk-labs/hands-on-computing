// 所属章节：22-async 与 await
// 演示知识点：循环串行 await、Promise.all 并发与 forEach 不等待回调
// 运行命令：node scripts/22-async-await/organization.mjs（工作目录 content/编程语言/javascript）
// 期望结果：串行与并发顺序不同；forEach returned 0 后 joined 1,2
const order = [];
async function work(id) {
  order.push(`start${id}`);
  await Promise.resolve();
  order.push(`end${id}`);
  return id * 10;
}
// 每次 await 完成后才进入下一轮，两个任务串行执行。
for (const id of [1, 2]) await work(id);
console.log("serial", order.join(",")); // → serial start1,end1,start2,end2
// 清空观察记录；map 先启动两个任务，all 再等待它们的结果。
order.length = 0;
console.log("values", JSON.stringify(await Promise.all([1, 2].map(work)))); // → values [10,20]
console.log("concurrent", order.join(",")); // → concurrent start1,start2,end1,end2

// 用手动放行的 gate 控制完成时刻，不靠任意延时猜测顺序。
const gate = Promise.withResolvers();
const finished = [];
const pending = [];
await [1, 2].forEach((id) => {
  pending.push((async () => { await gate.promise; finished.push(id); })());
});
console.log("forEach returned", finished.length); // → forEach returned 0
// forEach 已返回；显式放行并等待收集的 Promise，才算全部结束。
gate.resolve();
await Promise.all(pending);
console.log("joined", finished.join(",")); // → joined 1,2

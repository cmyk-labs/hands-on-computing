// 所属章节：21-Promise
// 演示知识点：链式传值、catch 恢复与 finally 抛错替换拒绝原因
// 运行命令：node scripts/21-promises/chains.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 chain 7、recovered、cleanup failed 与 missing return true
Promise.resolve(2)
  .then((value) => value * 3)
  .then((value) => Promise.resolve(value + 1))
  .finally(() => 999)
  .then((value) => console.log("chain", value)); // → chain 7

Promise.resolve("input")
  .then(() => { throw new RangeError("callback failed"); }, () => "not reached")
  .catch((error) => {
    console.log(error.name, error.message); // → RangeError callback failed
    return "recovered";
  })
  .then((value) => console.log(value)); // → recovered

Promise.reject(new Error("operation failed"))
  .finally(() => { throw new Error("cleanup failed"); })
  .catch((error) => console.log(error.message)); // → cleanup failed

Promise.resolve(3).then(() => {}).then((value) => {
  console.log("missing return", value === undefined); // → missing return true
});

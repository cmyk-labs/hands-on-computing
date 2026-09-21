// 所属章节：21-Promise
// 演示知识点：执行器结果一次性采用、thenable 采用与执行器抛错
// 运行命令：node scripts/21-promises/states.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 executor | after resolve | sync end | value=7 与 thenable 9
const events = [];
const inner = Promise.withResolvers();
const outer = new Promise((resolve, reject) => {
  events.push("executor");
  resolve(inner.promise);
  reject(new Error("ignored"));
  events.push("after resolve");
});
outer.then((value) => {
  events.push(`value=${value}`);
  console.log(events.join(" | ")); // → executor | after resolve | sync end | value=7
});
events.push("sync end");
inner.resolve(7);

const thenable = {
  then(resolve, reject) {
    resolve(9);
    reject(new Error("ignored again"));
  },
};
Promise.resolve(thenable).then((value) => console.log("thenable", value)); // → thenable 9
new Promise(() => { throw new Error("executor failed"); })
  .catch((error) => console.log(error.message)); // → executor failed

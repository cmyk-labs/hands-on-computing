// 所属章节：21-Promise
// 演示知识点：all、allSettled、any、race 的结果规则、空输入与函数直传
// 运行命令：node scripts/21-promises/combine.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 all [1,2]、AggregateError A,B、race pending true 等各组合结果
// 1. 故意让第二项先完成，观察 all 的结果仍按输入位置排列。
const first = Promise.withResolvers();
const second = Promise.withResolvers();
Promise.all([first.promise, second.promise]).then((values) => {
  console.log("all", JSON.stringify(values)); // → all [1,2]
});
second.resolve(2);
first.resolve(1);

// 2. 用明确的成功与失败输入，对比保留所有结果、首个成功和首个落定。
Promise.allSettled([Promise.resolve(4), Promise.reject("offline")])
  .then((values) => console.log("settled", JSON.stringify(values)));
// → settled [{"status":"fulfilled","value":4},{"status":"rejected","reason":"offline"}]
Promise.any([Promise.reject("A"), Promise.resolve("B")])
  .then((value) => console.log("any", value)); // → any B
Promise.any([Promise.reject("A"), Promise.reject("B")])
  .catch((error) => console.log(error.name, error.errors.join(","))); // → AggregateError A,B
Promise.race([Promise.reject("first"), Promise.resolve("second")])
  .catch((reason) => console.log("race", reason)); // → race first

// 3. 空输入单独比较；race 没有可采用的结果。
Promise.all([]).then((values) => console.log("all empty", values.length)); // → all empty 0
Promise.allSettled([]).then((values) => console.log("settled empty", values.length)); // → settled empty 0
Promise.any([]).catch((error) => console.log("any empty", error.errors.length)); // → any empty 0
let emptyRaceFinished = false;
Promise.race([]).then(() => { emptyRaceFinished = true; });
Promise.resolve().then(() => console.log("race pending", !emptyRaceFinished)); // → race pending true
// 这里只观察一个检查点；一直待定的规则来自规范，而非有限次测量。

// 4. 传函数与调用函数不同：只有 task() 才会启动这项任务。
let starts = 0;
const task = () => { starts += 1; return Promise.resolve(8); };
Promise.all([task]).then(([value]) => {
  console.log("function kept", value === task); // → function kept true
});
console.log("before call", starts); // → before call 0
Promise.all([task()]).then(([value]) => console.log("started", starts, value)); // → started 1 8

// 5. all 的拒绝只决定组合结果，已启动的 survivor 仍能完成。
const survivor = Promise.withResolvers();
const both = Promise.all([Promise.reject("stop result"), survivor.promise]);
both.catch((reason) => {
  console.log(reason); // → stop result
  survivor.resolve("other work completed");
});
survivor.promise.then((value) => console.log(value)); // → other work completed

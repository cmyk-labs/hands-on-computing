const first = Promise.withResolvers();
const second = Promise.withResolvers();
Promise.all([first.promise, second.promise]).then((values) => {
  console.log("all", JSON.stringify(values)); // → all [1,2]
});
second.resolve(2);
first.resolve(1);

Promise.allSettled([Promise.resolve(4), Promise.reject("offline")])
  .then((values) => console.log("settled", JSON.stringify(values)));
// → settled [{"status":"fulfilled","value":4},{"status":"rejected","reason":"offline"}]
Promise.any([Promise.reject("A"), Promise.resolve("B")])
  .then((value) => console.log("any", value)); // → any B
Promise.any([Promise.reject("A"), Promise.reject("B")])
  .catch((error) => console.log(error.name, error.errors.join(","))); // → AggregateError A,B
Promise.race([Promise.reject("first"), Promise.resolve("second")])
  .catch((reason) => console.log("race", reason)); // → race first

Promise.all([]).then((values) => console.log("all empty", values.length)); // → all empty 0
Promise.allSettled([]).then((values) => console.log("settled empty", values.length)); // → settled empty 0
Promise.any([]).catch((error) => console.log("any empty", error.errors.length)); // → any empty 0
let emptyRaceFinished = false;
Promise.race([]).then(() => { emptyRaceFinished = true; });
Promise.resolve().then(() => console.log("race pending", !emptyRaceFinished)); // → race pending true
// 这里只观察一个检查点；一直待定的规则来自规范，而非有限次测量。

let starts = 0;
const task = () => { starts += 1; return Promise.resolve(8); };
Promise.all([task]).then(([value]) => {
  console.log("function kept", value === task); // → function kept true
});
console.log("before call", starts); // → before call 0
Promise.all([task()]).then(([value]) => console.log("started", starts, value)); // → started 1 8

const survivor = Promise.withResolvers();
const both = Promise.all([Promise.reject("stop result"), survivor.promise]);
both.catch((reason) => {
  console.log(reason); // → stop result
  survivor.resolve("other work completed");
});
survivor.promise.then((value) => console.log(value)); // → other work completed

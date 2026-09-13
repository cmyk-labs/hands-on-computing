const order = [];
async function work(id) {
  order.push(`start${id}`);
  await Promise.resolve();
  order.push(`end${id}`);
  return id * 10;
}
for (const id of [1, 2]) await work(id);
console.log("serial", order.join(",")); // → serial start1,end1,start2,end2
order.length = 0;
console.log("values", JSON.stringify(await Promise.all([1, 2].map(work)))); // → values [10,20]
console.log("concurrent", order.join(",")); // → concurrent start1,start2,end1,end2

const gate = Promise.withResolvers();
const finished = [];
const pending = [];
await [1, 2].forEach((id) => {
  pending.push((async () => { await gate.promise; finished.push(id); })());
});
console.log("forEach returned", finished.length); // → forEach returned 0
gate.resolve();
await Promise.all(pending);
console.log("joined", finished.join(",")); // → joined 1,2

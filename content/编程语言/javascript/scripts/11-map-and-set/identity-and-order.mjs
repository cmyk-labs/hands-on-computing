const learner = { name: "林" };
const visits = new Map([[learner, 1], [NaN, "首次"], [-0, "零"]]);
learner.name = "林同学";
visits.set(NaN, "更新");
visits.set(+0, "同一个零");
console.log(visits.size, visits.get(learner), visits.has({ name: "林同学" }));
console.log(visits.get(NaN), visits.get(-0), visits.has("0"));
const order = new Map([["a", 1], ["b", 2]]);
order.set("a", 10);
console.log([...order.keys()].join(","));
order.delete("a");
order.set("a", 20);
console.log([...order.values()].join(","));
const pairs = [];
for (const [key, value] of order) pairs.push(key + ":" + value);
console.log(pairs.join(","));
order.forEach((value, key, map) => console.log(key, value, map === order));

// 按本例输入运行，输出依次为：
// 3 1 false
// 更新 同一个零 false
// a,b
// 2,20
// b:2,a:20
// b 2 true
// a 20 true

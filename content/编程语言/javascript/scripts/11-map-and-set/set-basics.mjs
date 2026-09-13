const topics = new Set(["函数", "集合", "函数"]);
console.log(topics.add("模块") === topics, topics.size, topics.has("集合"));
console.log([...topics].join(","));
console.log(JSON.stringify([...topics.entries()]));
const seen = [];
topics.forEach((value, key) => seen.push(value === key));
console.log(seen.every(Boolean));
console.log(topics.delete("模块"), topics.delete("模块"));
const same = { id: 1 };
console.log(new Set([same, same, { id: 1 }]).size);
console.log(topics.clear(), topics.size);

// 按本例输入运行，输出依次为：
// true 3 true
// 函数,集合,模块
// [["函数","函数"],["集合","集合"],["模块","模块"]]
// true
// true false
// 2
// undefined 0

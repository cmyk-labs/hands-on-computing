// 所属章节：11-Map 与 Set
// 演示知识点：Set 去重、成员判断、entries 键值相同与遍历
// 运行命令：node scripts/11-map-and-set/set-basics.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
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

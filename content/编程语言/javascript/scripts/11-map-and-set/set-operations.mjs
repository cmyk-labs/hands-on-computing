// 所属章节：11-Map 与 Set
// 演示知识点：七种集合运算与结果顺序、类集合参数
// 运行命令：node scripts/11-map-and-set/set-operations.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
const left = new Set(["函数", "集合"]);
const right = new Set(["集合", "模块"]);
console.log([...left.union(right)].join(","));
console.log([...left.intersection(right)].join(","));
console.log([...left.difference(right)].join(","));
console.log([...left.symmetricDifference(right)].join(","));
console.log(left.isSubsetOf(left.union(right)), left.isSupersetOf(new Set(["函数"])));
console.log(left.isDisjointFrom(new Set(["日期"])), left.size, right.size);
console.log([...new Set([1, 2, 3]).intersection(new Set([2, 1]))].join(","));
console.log([...new Set([1, 2]).intersection(new Map([[2, "记录"]]))].join(","));

// 按本例输入运行，输出依次为：
// 函数,集合,模块
// 集合
// 函数
// 函数,模块
// true true
// true 2 2
// 2,1
// 2

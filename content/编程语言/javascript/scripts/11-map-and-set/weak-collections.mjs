// 所属章节：11-Map 与 Set
// 演示知识点：WeakMap 与 WeakSet 的弱引用标记、局部符号可作弱键、不可遍历不可计数
// 运行命令：node scripts/11-map-and-set/weak-collections.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
const item = { title: "笔记" };
const metadata = new WeakMap();
metadata.set(item, { reviewed: true });
const processed = new WeakSet([item]);
console.log(metadata.get(item).reviewed, processed.has(item));
const localToken = Symbol("局部令牌");
metadata.set(localToken, 5);
processed.add(localToken);
console.log(metadata.get(localToken), processed.has(localToken));
console.log(metadata.delete(item), processed.delete(item));
console.log(metadata.has(item), processed.has(item));
console.log(typeof metadata[Symbol.iterator], typeof processed.size);

// 按本例输入运行，输出依次为：
// true true
// 5 true
// true true
// false false
// undefined undefined

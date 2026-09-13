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

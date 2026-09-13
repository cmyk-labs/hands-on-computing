const key = Symbol("hidden");
const input = { absent: undefined, empty: null, callback() {}, token: Symbol("v"), [key]: 1 };
const text = JSON.stringify(input);
console.log(text);
const restored = JSON.parse(text);
console.log(Object.hasOwn(restored, "absent"), Object.hasOwn(restored, "empty"));
console.log(JSON.stringify([undefined, () => 1, Symbol("v"), , NaN, Infinity]));
console.log(JSON.stringify(undefined) === undefined, JSON.stringify(-0));
console.log(JSON.stringify(new Map([["JS", 1]])), JSON.stringify(new Set([1])));
console.log(JSON.stringify([...new Map([["JS", 1]])]));

// 按本例输入运行，输出依次为：
// {"empty":null}
// false true
// [null,null,null,null,null,null]
// true 0
// {} {}
// [["JS",1]]

import * as counter from "./counter.mjs";
console.log(Object.keys(counter).join(","));
console.log(Object.getPrototypeOf(counter) === null, Object.isExtensible(counter));
console.log(Object.getOwnPropertyDescriptor(counter, "count").writable);
counter.increment();
console.log(counter.count, counter.default);

// 按本例输入运行，输出依次为：
// count,default,increment,settings
// true false
// true
// 1 0

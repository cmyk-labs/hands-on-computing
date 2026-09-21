// 所属章节：19-ES 模块
// 演示知识点：命名空间导入的键集合、原型与属性描述符
// 运行命令：node scripts/19-es-modules/namespace.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 count,default,increment,settings 等键与 1 0
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

var moduleOnlyValue = 7;
function getThis() { return this; }
console.log(moduleOnlyValue, Object.hasOwn(globalThis, "moduleOnlyValue"));
console.log(this === undefined, getThis() === undefined);

// 按本例输入运行，输出依次为：
// 7 false
// true true

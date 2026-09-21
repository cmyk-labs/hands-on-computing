// 所属章节：19-ES 模块
// 演示知识点：模块顶层作用域不污染全局与顶层 this 为 undefined
// 运行命令：node scripts/19-es-modules/module-scope.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 7 false 与 true true
var moduleOnlyValue = 7;
function getThis() { return this; }
console.log(moduleOnlyValue, Object.hasOwn(globalThis, "moduleOnlyValue"));
console.log(this === undefined, getThis() === undefined);

// 按本例输入运行，输出依次为：
// 7 false
// true true

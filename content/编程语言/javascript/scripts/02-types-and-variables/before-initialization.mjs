// 所属章节：02-类型与变量
// 演示知识点：let 声明的名称在暂时性死区中不能提前读取
// 运行命令：node scripts/02-types-and-variables/before-initialization.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 ReferenceError 并以非零状态退出
console.log(typeof future); // ReferenceError：future 仍在暂时性死区
let future = 1;

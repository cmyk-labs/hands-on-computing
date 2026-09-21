// 所属章节：03-运算与类型转换
// 演示知识点：括号结束可选链后，继续读取 undefined 的属性会失败
// 运行命令：node scripts/03-operators-and-conversion/broken-chain.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError（Cannot read properties of undefined）并以非零状态退出
const user = null;
console.log((user?.profile).name);
// 预期错误：TypeError；Cannot read properties of undefined

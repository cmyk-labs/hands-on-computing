// 所属章节：02-类型与变量
// 演示知识点：const 绑定不能重新赋值
// 运行命令：node scripts/02-types-and-variables/const-reassignment.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 TypeError 并以非零状态退出
const count = 1;
count = 2; // TypeError：const 绑定不能重新赋值

// 所属章节：02-类型与变量
// 演示知识点：普通 const 声明必须给出初始值
// 运行命令：node scripts/02-types-and-variables/missing-initializer.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 SyntaxError（文件不能解析）并以非零状态退出
const value; // SyntaxError：这种普通 const 声明必须给出初始值

// 所属章节：01-运行与代码书写
// 演示知识点：等号后缺少初始化表达式引发 SyntaxError
// 运行命令：node scripts/01-running-and-writing/syntax-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 SyntaxError（文件不能解析）并以非零状态退出
const score = ; // SyntaxError：等号后缺少用于初始化的表达式

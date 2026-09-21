// 所属章节：03-运算与类型转换
// 演示知识点：空值合并与逻辑或混写时必须用括号说明分组
// 运行命令：node scripts/03-operators-and-conversion/mixed-coalescing.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 SyntaxError（missing ) after argument list）并以非零状态退出
console.log(null ?? false || true);
// 预期错误：SyntaxError；missing ) after argument list

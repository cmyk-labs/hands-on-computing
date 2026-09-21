// 所属章节：05-字符串与 Unicode
// 演示知识点：孤立代理码元无法按 URI 编码规则转换为 UTF-8
// 运行命令：node scripts/05-strings-and-unicode/uri-invalid.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 URIError（URI malformed）并以非零状态退出
console.log(encodeURIComponent("\uD800"));
// 预期错误：URIError；URI malformed

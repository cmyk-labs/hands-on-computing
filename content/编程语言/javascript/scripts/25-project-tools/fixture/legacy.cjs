// 所属章节：25-项目组织与工程工具
// 演示知识点：同包内明确使用 CommonJS 的文件
// 运行命令：npm run check:25（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，默认导出 { label: "CommonJS" } 供 consumer.mjs 断言
module.exports = { label: "CommonJS" };

// 所属章节：25-项目组织与工程工具
// 演示知识点：只用于静态检查的未声明变量与宽松相等反例
// 运行命令：node node_modules/eslint/bin/eslint.js --config scripts/25-project-tools/eslint.config.mjs scripts/25-project-tools/lint-failure.mjs（工作目录 content/编程语言/javascript）
// 期望结果：ESLint 退出 1，分别报告 no-undef 与 eqeqeq
console.log(notDeclared == 1);
// → ESLint 返回 1，分别包含 no-undef 和 eqeqeq；不作为正常脚本运行。

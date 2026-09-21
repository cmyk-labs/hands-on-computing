// 所属章节：25-项目组织与工程工具
// 演示知识点：最小可执行的 ESLint 平面配置（no-undef、no-unused-vars、eqeqeq）
// 运行命令：node node_modules/eslint/bin/eslint.js --config scripts/25-project-tools/eslint.config.mjs scripts/25-project-tools/lint-failure.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按该配置检查 lint-failure.mjs 报出两类问题并退出 1
export default [
  {
    files: ["**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: "module",
      globals: { console: "readonly" },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
      eqeqeq: ["error", "always"],
    },
  },
];

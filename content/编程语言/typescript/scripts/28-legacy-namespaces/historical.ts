// 所属章节：28-命名空间与旧项目阅读
// 演示知识点：TypeScript 7 已移除的 module 命名空间历史语法
// 运行命令：npm run errors:28（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
// 历史阅读：module 的这种命名空间用法已在 TypeScript 7 移除。
module Historical {
  export const value = 1;
}

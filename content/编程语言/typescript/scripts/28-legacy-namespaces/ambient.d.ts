// 所属章节：28-命名空间与旧项目阅读
// 演示知识点：只包含类型的环境命名空间声明
// 运行命令：npm run check:28（工作目录 content/编程语言/typescript）
// 期望结果：类型检查正常退出
declare namespace LegacySettings {
  interface Options { upper: boolean }
}

// 所属章节：29-项目引用与编译性能
// 演示知识点：composite 基础模块的公共接口与 isolatedDeclarations 声明
// 运行命令：npm run build:29（工作目录 content/编程语言/typescript）
// 期望结果：按依赖图生成 core/dist 实现与声明
export interface Item { price: number }
export function total(items: readonly Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

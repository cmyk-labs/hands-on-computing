// 所属章节：21-JavaScript 迁移与 JSDoc
// 演示知识点：迁移后的 Product 接口与 label 函数
// 运行命令：npm run run:21（工作目录 content/编程语言/typescript）
// 期望结果：主入口输出 笔:10 11 gross 7
export interface Product { name: string; price: number }
export function label(product: Product): string {
  return product.name + ":" + product.price;
}

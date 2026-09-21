// 所属章节：28-命名空间与旧项目阅读
// 演示知识点：三斜线依赖与可运行的全局命名空间
// 运行命令：npm run run:28（工作目录 content/编程语言/typescript）
// 期望结果：输出 ADA
/// <reference path="./global-a.ts" />
/// <reference types="node" />
/// <reference lib="es2025" />
namespace GlobalLesson {
  export function label(item: Item): string { return item.name.toUpperCase(); }
}
const globalItem: GlobalLesson.Item = { name: "Ada" };
console.log(GlobalLesson.label(globalItem)); // ADA；global-a.ts 只有被擦除的接口。

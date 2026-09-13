/// <reference path="./global-a.ts" />
/// <reference types="node" />
/// <reference lib="es2025" />
namespace GlobalLesson {
  export function label(item: Item): string { return item.name.toUpperCase(); }
}
const globalItem: GlobalLesson.Item = { name: "Ada" };
console.log(GlobalLesson.label(globalItem)); // ADA；global-a.ts 只有被擦除的接口。

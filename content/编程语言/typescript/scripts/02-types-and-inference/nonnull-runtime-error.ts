// 所属章节：02-常用类型与类型推断
// 演示知识点：! 非空断言不检查空值的运行时反例
// 运行命令：node .build/02-types-and-inference/nonnull-runtime-error.js（工作目录 content/编程语言/typescript）
// 期望结果：非零退出并抛出 TypeError：! 没有检查 null
function titleLength(title: string | null): number {
  return title!.length;
}
titleLength(null); // 类型检查通过；运行时 TypeError：! 没有检查 null

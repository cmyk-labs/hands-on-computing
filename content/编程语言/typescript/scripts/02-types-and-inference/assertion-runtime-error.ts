// 所属章节：02-常用类型与类型推断
// 演示知识点：as 断言不转换值的运行时反例
// 运行命令：node .build/02-types-and-inference/assertion-runtime-error.js（工作目录 content/编程语言/typescript）
// 期望结果：非零退出并抛出 TypeError：断言没有转换数值
const input: unknown = 12;
const text = input as string;
text.toUpperCase(); // 类型检查通过；运行时 TypeError：断言没有转换数值

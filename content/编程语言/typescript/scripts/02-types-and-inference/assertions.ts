// 所属章节：02-常用类型与类型推断
// 演示知识点：as 断言与 String 真实转换的对比、非空断言不检查实际值
// 运行命令：npm run run:02（工作目录 content/编程语言/typescript）
// 期望结果：按正文顺序输出各示例值，与正文行内注释一致
const input: unknown = 42;
const assumedText = input as string; // 只改变编译器对这个表达式的看法
console.log(typeof assumedText); // number：运行时的值仍是数值
const convertedText = String(input); // 真正执行字符串转换
console.log(typeof convertedText); // string

function titleLength(title: string | null): number {
  return title!.length; // ! 从静态类型中排除 null 和 undefined，不检查实际值
}
console.log(titleLength("JS")); // 2：这次实参确实是字符串

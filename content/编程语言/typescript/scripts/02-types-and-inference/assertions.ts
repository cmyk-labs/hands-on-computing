const input: unknown = 42;
const assumedText = input as string; // 只改变编译器对这个表达式的看法
console.log(typeof assumedText); // number：运行时的值仍是数值
const convertedText = String(input); // 真正执行字符串转换
console.log(typeof convertedText); // string

function titleLength(title: string | null): number {
  return title!.length; // ! 从静态类型中排除 null 和 undefined，不检查实际值
}
console.log(titleLength("JS")); // 2：这次实参确实是字符串

// 所属章节：01-TypeScript 与工具链
// 演示知识点：TS2322 反例：string 不能赋给 number 变量
// 运行命令：npm run errors:01（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
const price: number = "19"; // TS2322：string 不能赋给 number
console.log(price); // 本例只做类型检查；报 TS2322，不生成或运行这条输出。

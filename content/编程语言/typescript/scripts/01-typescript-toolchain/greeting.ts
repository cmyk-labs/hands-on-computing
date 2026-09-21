// 所属章节：01-TypeScript 与工具链
// 演示知识点：带参数类型标注的正常程序，用于检查、生成、运行与观察类型擦除
// 运行命令：npm run run:01（工作目录 content/编程语言/typescript）
// 期望结果：输出 你好，小林
function greet(name: string) {
  return "你好，" + name;
}
console.log(greet("小林")); // 你好，小林

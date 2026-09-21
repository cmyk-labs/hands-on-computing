// 所属章节：18-声明文件与第三方类型
// 演示知识点：无类型标注的 JavaScript 实现（label 函数与 Meter 类）
// 运行命令：npm run run:18（工作目录 content/编程语言/typescript）
// 期望结果：主入口经声明使用实现，输出 读数:7 reading.txt
export function label(value) { return `读数:${value}`; }
export class Meter {
  constructor(start) { this.value = start; }
  add(step) { this.value += step; return this.value; }
}

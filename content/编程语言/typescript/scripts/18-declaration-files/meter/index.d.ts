// 所属章节：18-声明文件与第三方类型
// 演示知识点：为既有 JavaScript 实现编写的模块声明
// 运行命令：npm run run:18（工作目录 content/编程语言/typescript）
// 期望结果：主入口按声明通过类型检查并正常输出
export declare function label(value: number): string;
export declare class Meter {
  constructor(start: number);
  value: number;
  add(step: number): number;
}

// 所属章节：24-类型声明生成与包分发
// 演示知识点：独立的 CommonJS 实现入口
// 运行命令：npm run build:24（工作目录 content/编程语言/typescript）
// 期望结果：生成 legacy.cjs 与 legacy.d.cts
export interface GreetingOptions { prefix?: string }
export function greet(name: string, options: GreetingOptions = {}): string {
  return (options.prefix ?? "你好") + "，" + name;
}

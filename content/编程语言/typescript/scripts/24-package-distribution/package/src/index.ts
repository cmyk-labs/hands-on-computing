// 所属章节：24-类型声明生成与包分发
// 演示知识点：ESM 主入口实现与 GreetingOptions 公共接口
// 运行命令：npm run build:24（工作目录 content/编程语言/typescript）
// 期望结果：在 package/dist 生成实现与 index.d.ts 声明
export interface GreetingOptions { prefix?: string }
export function greet(name: string, options: GreetingOptions = {}): string {
  return (options.prefix ?? "你好") + "，" + name;
}

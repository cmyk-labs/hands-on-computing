// 所属章节：19-声明合并与模块扩充
// 演示知识点：被模块扩充的基础类 Gauge
// 运行命令：npm run run:19（工作目录 content/编程语言/typescript）
// 期望结果：主入口调用扩充后的 double 输出 8
export class Gauge {
  constructor(public value: number) {}
}

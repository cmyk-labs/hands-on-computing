// 所属章节：27-装饰器
// 演示知识点：experimentalDecorators 旧式参数装饰器
// 运行命令：npm run run:27:legacy（工作目录 content/编程语言/typescript）
// 期望结果：输出 Hi Ada 与 greet:0
const legacyEvents: string[] = [];
function mark(_target: object, key: string | symbol | undefined, index: number): void {
  legacyEvents.push(String(key) + ":" + index);
}
class Legacy {
  greet(@mark name: string): string { return "Hi " + name; }
}
console.log(new Legacy().greet("Ada"), legacyEvents.join(",")); // → Hi Ada greet:0
export {};

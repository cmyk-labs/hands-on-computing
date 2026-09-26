// 所属章节：27-装饰器
// 演示知识点：装饰器求值、应用、初始化与调用顺序输出
// 运行命令：npm run run:27（工作目录 content/编程语言/typescript）
// 期望结果：events 与行内注释顺序一致，greet 输出 Hi Ada
import { events, trace, register, trimField } from "./decorators.js";
// 类定义阶段求值并应用装饰器；两个方法装饰器从内向外组合。
@register
class Greeter {
  @trimField name = " Ada ";
  @trace("outer")
  @trace("inner")
  greet(prefix: string): string { return prefix + this.name; }
}
// 实例化触发初始化器和字段初始化，随后调用包装后的 greet。
const greeter = new Greeter();
const message = greeter.greet("Hi ");
// 预期事件顺序：evaluate outer | evaluate inner | apply inner:greet | apply outer:greet |
// apply field name | class class:Greeter | class ready Greeter | init inner | init outer |
// initialize field name | call outer | call inner
console.log(events.join(" | "));
console.log(message, greeter.name); // Hi Ada Ada：包装调用结果和规范化字段。

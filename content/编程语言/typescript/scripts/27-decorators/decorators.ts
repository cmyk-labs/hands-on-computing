// 所属章节：27-装饰器
// 演示知识点：方法包装、字段初始化与类初始化装饰器的求值与应用
// 运行命令：npm run run:27（工作目录 content/编程语言/typescript）
// 期望结果：主入口 events 顺序断言全部通过
export const events: string[] = [];
export function trace(label: string) {
  events.push("evaluate " + label);
  return function <This, Args extends unknown[], Return>(
    method: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
  ) {
    events.push("apply " + label + ":" + String(context.name));
    context.addInitializer(function () { events.push("init " + label); });
    return function (this: This, ...args: Args): Return {
      events.push("call " + label);
      return method.apply(this, args);
    };
  };
}
export function register(value: Function, context: ClassDecoratorContext) {
  events.push("class " + context.kind + ":" + (context.name ?? "anonymous"));
  context.addInitializer(function () { events.push("class ready " + this.name); });
}
export function trimField(_value: undefined, context: ClassFieldDecoratorContext<unknown, string>) {
  events.push("apply field " + String(context.name));
  return function (initial: string): string {
    events.push("initialize field " + String(context.name));
    return initial.trim();
  };
}

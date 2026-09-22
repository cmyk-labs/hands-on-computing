// 所属章节：27-装饰器
// 演示知识点：方法包装、字段初始化与类初始化装饰器的求值与应用
// 运行命令：npm run run:27（工作目录 content/编程语言/typescript）
// 期望结果：主入口 events 顺序断言全部通过
export const events: string[] = [];
export function trace(label: string) {
  // 调用装饰器工厂时记录求值；返回的函数稍后才应用到方法。
  events.push("evaluate " + label);
  return function <This, Args extends unknown[], Return>(
    method: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
  ) {
    events.push("apply " + label + ":" + String(context.name));
    // 为每个实例登记初始化动作；这里不立即执行初始化器。
    context.addInitializer(function () { events.push("init " + label); });
    // 返回包装方法，保留原方法的 this、参数和返回类型。
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
  // 字段装饰器返回值处理每个实例的初始字段值，不在定义类时直接赋值。
  return function (initial: string): string {
    events.push("initialize field " + String(context.name));
    return initial.trim();
  };
}

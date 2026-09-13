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

export interface GreetingOptions { prefix?: string }
export function greet(name: string, options: GreetingOptions = {}): string {
  return (options.prefix ?? "你好") + "，" + name;
}

// 所属章节：16-工具类型
// 演示知识点：Partial、Record、Pick、Omit 等属性工具，Exclude、NonNullable 等联合工具，函数与 Promise 推断工具，NoInfer 与 ThisType
// 运行命令：npm run run:16（工作目录 content/编程语言/typescript）
// 期望结果：正常退出，各段预期输出与行内注释一致
export type Account = { id: number; name: string; profile: { city: string } };
const patch: Partial<Account> = { name: "阿青" };
const required: Required<{ name?: string }> = { name: "阿青" };
const readonlyView: Readonly<Account> = { id: 1, name: "阿青", profile: { city: "杭州" } };
readonlyView.profile.city = "上海";
const counts: Record<"done" | "todo", number> = { done: 2, todo: 3 };
const summary: Pick<Account, "id" | "name"> = { id: 1, name: "阿青" };
const newAccount: Omit<Account, "id"> = { name: "小林", profile: { city: "苏州" } };
console.log(patch.name, required.name, readonlyView.profile.city, counts.done, summary.id, newAccount.name);
// 预期输出：阿青 阿青 上海 2 1 小林

type Select<T, K extends keyof T> = {
  [P in K]: T[P];
};
type AccountSummary = Select<Account, "id" | "name">; // 等价于 { id: number; name: string }。

type Update = Pick<Account, "id"> & Partial<Omit<Account, "id">>;
const update: Update = { id: 1, name: "新名字" };
const stored: Account = { id: 2, name: "保留对象", profile: { city: "南京" } };
const visible: Omit<Account, "id"> = stored;
console.log(update.id, "id" in visible);
// 预期输出：1 true

type State = "draft" | "ready" | "archived";
const active: Exclude<State, "archived"> = "ready";
const finalState: Extract<State, "ready" | "archived"> = "archived";
const text: NonNullable<string | null | undefined> = "存在";
console.log(active, finalState, text);
// 预期输出：ready archived 存在

function format(code: number, label: string) { return `${label}:${code}`; }
const args: Parameters<typeof format> = [3, "条目"];
const formatted: ReturnType<typeof format> = format(...args);
class Ticket {
  constructor(public code: number) {}
}
const constructorArgs: ConstructorParameters<typeof Ticket> = [8];
const ticket: InstanceType<typeof Ticket> = new Ticket(...constructorArgs);
console.log(formatted, ticket.code);
// 预期输出：条目:3 8

async function loadLocal() { return { total: 4 }; }
type Loaded = Awaited<ReturnType<typeof loadLocal>>;
const loaded: Loaded = await loadLocal();
const nested: Awaited<Promise<Promise<number>>> = 6;
console.log(loaded.total, nested);
// 预期输出：4 6

export function choose<C extends string>(choices: readonly C[], fallback: NoInfer<C>): C {
  return fallback;
}
console.log(choose(["read", "write"], "read"));
// 预期输出：read

function show(this: { label: string }, count: number) { return `${this.label}:${count}`; }
const receiver: ThisParameterType<typeof show> = { label: "记录" };
const bound: OmitThisParameter<typeof show> = show.bind(receiver);
console.log(bound(2));
// 预期输出：记录:2

type CounterState = { count: number };
type Methods = { increment(): void };
const methods: Methods & ThisType<CounterState & Methods> = {
  increment() { this.count += 1; }
};
const counter = { count: 0, ...methods };
counter.increment();
console.log(counter.count);
// 预期输出：1

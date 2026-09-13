export {};
function identity<T>(value: T): T { return value; }
function pair<T>(left: T, right: T): [T, T] { return [left, right]; }
const text = identity("泛型");
const count = identity<number>(3);
const mixed = pair<string | number>("一", 1);
console.log(text.toUpperCase(), count.toFixed(0), mixed.join(",")); // 泛型 3 一,1

interface Box<T = string> { value: T; }
type Maybe<T> = T | undefined;
interface Identity { <T>(value: T): T; }
const genericIdentity: Identity = identity;
const titleBox: Box = { value: "类型" };
const numberBox: Box<number> = { value: 2 };
const absent: Maybe<number> = undefined;
console.log(titleBox.value, numberBox.value, genericIdentity(true), absent); // 类型 2 true undefined

function keepLength<T extends { length: number }>(value: T): T { return value; }
function first<T>(values: readonly T[]): T | undefined { return values[0]; }
const detailed = keepLength({ length: 2, label: "课" });
const firstText = first(["A", "B"]);
console.log(detailed.label, firstText?.toLowerCase(), first<number>([])); // 课 a undefined

function keep<const T extends readonly string[]>(values: T): T { return values; }
const exact = keep(["读", "写"]); // readonly ["读", "写"]。
const existing = ["读", "写"];
const broad = keep(existing); // string[]：已有变量的类型不会倒推恢复。
function join<A extends readonly unknown[], B extends readonly unknown[]>(left: A, right: B): [...A, ...B] {
  return [...left, ...right];
}
const joined = join(["TS", 1] as const, [true] as const);
const fixed: ["TS", 1, true] = joined;
console.log(exact[0], broad.length, fixed.join(",")); // 读 2 TS,1,true

async function ready<T>(value: T): Promise<T> { return value; }
const promised: Promise<number> = ready(7);
const prices = new Map<string, number>([["笔记", 3]]);
const tags = new Set<string>(["类型", "类型", "函数"]);
const resolved = await promised;
console.log(resolved.toFixed(0), prices.get("缺失") ?? 0, tags.size); // 7 0 2

function sumIterable(values: Iterable<number>): number {
  let sum = 0;
  for (const value of values) sum += value;
  return sum;
}
function* exchange(): Generator<number, string, number> {
  const added: number = yield 2;
  return "sum:" + (2 + added);
}
const iterator: Iterator<number, string, number> = exchange();
const start = iterator.next();
const end = iterator.next(3);
const endText = end.done ? end.value.toUpperCase() : String(end.value);
console.log(sumIterable(new Set([2, 3])), JSON.stringify(start), endText); // 5 {"value":2,"done":false} SUM:5

async function* rows(): AsyncGenerator<string, void, unknown> {
  yield "A";
  yield "B";
}
async function collect<T>(source: AsyncIterable<T>): Promise<T[]> {
  const values: T[] = [];
  for await (const value of source) values.push(value);
  return values;
}
const collected = await collect(rows());
const asyncIterator: AsyncIterator<string, void, unknown> = rows();
await asyncIterator.next();
await asyncIterator.next();
const finished = await asyncIterator.next();
console.log(collected.join(","), finished.done); // A,B true

interface Source<out T> { read: () => T; }
interface Sink<in T> { write: (value: T) => void; }
interface Cell<in out T> { read: () => T; write: (value: T) => void; }
const source: Source<string> = { read: () => "TS" };
const widerSource: Source<string | number> = source;
const consumed: (string | number)[] = [];
const widerSink: Sink<string | number> = { write: (value) => { consumed.push(value); } };
const textSink: Sink<string> = widerSink;
textSink.write("类型");
const cell: Cell<number> = { read: () => 1, write: (value) => { consumed.push(value); } };
console.log(widerSource.read(), consumed.join(","), cell.read()); // TS 类型 1

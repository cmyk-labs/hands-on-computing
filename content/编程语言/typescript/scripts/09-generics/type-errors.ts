export {};

function same<T>(value: T): T { return value; }
same<number>("3"); // 显式类型实参要求 number。
function createFromType<T>(): T { return new T(); } // T 仅存在于类型位置，不是构造函数值。

interface DefaultBox<T = string> { value: T; }
const wrongDefault: DefaultBox = { value: 3 }; // 省略实参时默认 T 为 string。

function constrained<T extends { length: number }>(value: T): T { return value; }
constrained(3); // number 没有 length。
function fabricate<T extends { length: number }>(): T {
  return { length: 0 }; // T 可能还要求其他成员，满足约束不等于满足任意 T。
}

function keepLiteral<const T extends readonly string[]>(values: T): T { return values; }
const exactLiteral = keepLiteral(["读", "写"]);
exactLiteral[0] = "读"; // 推断的元组位置为 readonly。

const scores = new Map<string, number>();
scores.set("课", "3"); // 值必须为 number。
const words = new Set<string>();
words.add(3); // 元素必须为 string。
async function wrongAsync(): number { return 3; } // async 的返回类型必须使用 Promise。

function* numericInput(): Generator<number, void, number> { const added: number = yield 1; }
const iterator = numericInput();
iterator.next("3"); // 恢复输入 TNext 为 number。
const nextOnly: Iterator<number, void, unknown> = { next: () => ({ done: true, value: undefined }) };
const iterable: Iterable<number> = nextOnly; // 缺少 Symbol.iterator。

interface Source<out T> { read: () => T; }
const broadSource: Source<string | number> = { read: () => 3 };
const tooNarrow: Source<string> = broadSource; // 可能产出 number，不满足只产出 string 的契约。
interface WrongVariance<out T> { write: (value: T) => void; } // 实际消费 T，不能声明为协变。

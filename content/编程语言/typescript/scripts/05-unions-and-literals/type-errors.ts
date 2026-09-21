// 所属章节：05-联合类型、交叉类型与字面量
// 演示知识点：联合未收窄调用、交叉冲突为 never、字面量拼写、判别分支缺数据、属性拓宽、只读赋值与 satisfies 拒绝不兼容值的类型错误反例
// 运行命令：npm run errors:05（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
export {};

function wrongUnion(value: string | number): string {
  return value.toUpperCase(); // number 分支没有此方法。
}

type Conflicting = { id: string } & { id: number };
const conflict: Conflicting = { id: "x" }; // id 需要满足 string & number，即 never。

type KnownState = "idle" | "ready" | "failed";
const typo: KnownState = "read"; // 不属于列出的字面量集合。
type StateResult = { state: "ready"; total: number } | { state: "failed"; reason: string };
const missingData: StateResult = { state: "ready" }; // ready 分支必须包含 total。

const widened = { state: "ready" };
const narrow: "ready" = widened.state; // 可写对象属性已拓宽为 string。
const constant = { state: "ready" } as const;
constant.state = "ready"; // 即使新值相同，也不能通过只读属性赋值。

type LabelContract = { text: string | [number, number] };
const invalid = { text: true } satisfies LabelContract; // 不兼容值被拒绝。
const omitted = {} satisfies LabelContract; // 缺少 text 被拒绝。
const annotatedLabel: LabelContract = { text: "TS" };
annotatedLabel.text.toUpperCase(); // 标注把读取类型设为联合，需要先收窄。

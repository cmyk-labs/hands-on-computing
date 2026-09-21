// 所属章节：08-类型兼容性
// 演示知识点：缺少必需成员、嵌套不兼容、新鲜字面量多余属性、strictFunctionTypes 下函数参数与函数属性严格检查、参数个数不足的类型错误反例
// 运行命令：npm run errors:08（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
export {};

type NeedBoth = { title: string; minutes: number };
const onlyTitle = { title: "兼容性" };
const insufficient: NeedBoth = onlyTitle; // 缺少目标必需成员 minutes。
const nested: { meta: { count: number } } = { meta: { count: "1" } }; // 嵌套成员不兼容。

const fresh: { title: string } = { title: "笔记", author: "林" }; // 新鲜字面量存在额外 author。

const narrowInput = (value: string): string => value.toUpperCase();
const unsafeInput: (value: string | number) => string = narrowInput; // 不能接收目标可能传来的 number。
const basicResult = () => ({ title: "函数" });
const missingReturn: () => { title: string; minutes: number } = basicResult; // 返回值缺少 minutes。

const twoRequired = (left: number, right: number): number => left + right;
const oneSlot: (left: number) => number = twoRequired; // 调用方不保证提供 right。
const requiredValue = (value: number): number => value;
const optionalSlot: (value?: number) => number = requiredValue; // 目标允许不给参数。

interface FunctionView { handle: (value: string | number) => string; }
const stringHandler = { handle: (value: string): string => value.toUpperCase() };
const saferView: FunctionView = stringHandler; // 函数属性受严格参数检查。

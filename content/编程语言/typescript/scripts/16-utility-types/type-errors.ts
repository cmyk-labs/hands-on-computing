// 所属章节：16-工具类型
// 演示知识点：浅层 Partial、必需键缺失、NonNullable 与 NoInfer 约束、ReturnType 非函数反例
// 运行命令：npm run errors:16（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
import { choose, type Account } from "./main.js";
const shallow: Partial<Account> = { profile: {} }; // profile 出现后仍必须有 city。
const noId: Pick<Account, "id"> & Partial<Omit<Account, "id">> = {}; // id 必需。
const missingKey: Record<"done" | "todo", number> = { done: 1 }; // todo 不能省略。
const nullText: NonNullable<string | null> = null; // 类型已排除 null。
choose(["read", "write"], "delete"); // fallback 不扩大推断出的模式集合。
type NotFunction = ReturnType<string>; // string 不符合调用签名约束。
// 预期诊断包含：TS2741, TS2322, TS2345, TS2344。

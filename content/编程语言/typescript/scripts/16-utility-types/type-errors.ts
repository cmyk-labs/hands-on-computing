import { choose, type Account } from "./main.js";
const shallow: Partial<Account> = { profile: {} }; // profile 出现后仍必须有 city。
const noId: Pick<Account, "id"> & Partial<Omit<Account, "id">> = {}; // id 必需。
const missingKey: Record<"done" | "todo", number> = { done: 1 }; // todo 不能省略。
const nullText: NonNullable<string | null> = null; // 类型已排除 null。
choose(["read", "write"], "delete"); // fallback 不扩大推断出的模式集合。
type NotFunction = ReturnType<string>; // string 不符合调用签名约束。
// 预期诊断包含：TS2741, TS2322, TS2345, TS2344。

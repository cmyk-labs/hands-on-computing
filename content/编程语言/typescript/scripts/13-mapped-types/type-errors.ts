import type { Copy, Complete, Optional, PublicStored } from "./main.js";
const preserved: Copy<{ readonly id: number }> = { id: 1 };
preserved.id = 2; // 映射保留了 readonly。
const absent: Complete<{ title?: string }> = {}; // 去掉 ? 后必须提供 title。
const explicit: Optional<{ title: string }> = { title: undefined }; // 精确可选属性检查不允许这个值。
const leaked: PublicStored = { title: "公开", id: 1 }; // id 已被过滤，直接字面量触发额外属性检查。
// 预期诊断包含：TS2540, TS2741, TS2375, TS2353。

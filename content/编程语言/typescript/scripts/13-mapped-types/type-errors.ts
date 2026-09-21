// 所属章节：13-映射类型
// 演示知识点：映射保留 readonly、去 ? 后缺属性、显式 undefined 与被过滤键的反例
// 运行命令：npm run errors:13（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
import type { Copy, Complete, Optional, PublicStored } from "./main.js";
const preserved: Copy<{ readonly id: number }> = { id: 1 };
preserved.id = 2; // 映射保留了 readonly。
const absent: Complete<{ title?: string }> = {}; // 去掉 ? 后必须提供 title。
const explicit: Optional<{ title: string }> = { title: undefined }; // 精确可选属性检查不允许这个值。
const leaked: PublicStored = { title: "公开", id: 1 }; // id 已被过滤，直接字面量触发额外属性检查。
// 预期诊断包含：TS2540, TS2741, TS2375, TS2353。

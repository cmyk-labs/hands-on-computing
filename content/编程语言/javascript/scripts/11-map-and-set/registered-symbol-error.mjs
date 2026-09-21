// 所属章节：11-Map 与 Set
// 演示知识点：注册符号（Symbol.for 返回值）不能作为弱键的独立反例
// 运行命令：node scripts/11-map-and-set/registered-symbol-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：退出状态为 1，诊断包含 TypeError（Invalid value used as weak map key）
const metadata = new WeakMap();
metadata.set(Symbol.for("shared"), 1);

// 独立运行：退出状态为 1；诊断包含 TypeError；Invalid value used as weak map key。

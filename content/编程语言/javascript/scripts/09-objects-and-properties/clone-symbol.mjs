// 所属章节：09-对象与属性
// 演示知识点：Symbol 值不可克隆，应与普通对象中被忽略的 Symbol 键区分
// 运行命令：node scripts/09-objects-and-properties/clone-symbol.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 DataCloneError（could not be cloned）并以非零状态退出
structuredClone({ value: Symbol("id") });
// 预期错误：DataCloneError；could not be cloned

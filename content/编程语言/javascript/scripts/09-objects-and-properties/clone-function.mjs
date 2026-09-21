// 所属章节：09-对象与属性
// 演示知识点：复制图中只要包含不可克隆的函数，也会整体失败
// 运行命令：node scripts/09-objects-and-properties/clone-function.mjs（工作目录 content/编程语言/javascript）
// 期望结果：抛出 DataCloneError（could not be cloned）并以非零状态退出
structuredClone({ callback() {} });
// 预期错误：DataCloneError；could not be cloned

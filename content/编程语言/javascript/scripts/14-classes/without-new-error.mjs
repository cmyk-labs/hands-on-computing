// 所属章节：14-类与继承
// 演示知识点：类不能普通调用的独立反例
// 运行命令：node scripts/14-classes/without-new-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：退出状态为 1，诊断包含 TypeError（cannot be invoked without 'new'）
class Course {}
Course();

// 独立运行：退出状态为 1；诊断包含 TypeError；cannot be invoked without 'new'。

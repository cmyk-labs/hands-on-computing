// 所属章节：14-类与继承
// 演示知识点：super 前访问 this 的独立反例
// 运行命令：node scripts/14-classes/before-super-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：退出状态为 1，诊断包含 ReferenceError（Must call super constructor）
class Base {}
class Child extends Base {
  constructor() {
    this.ready = true;
    super();
  }
}
new Child();

// 独立运行：退出状态为 1；诊断包含 ReferenceError；Must call super constructor。

class Base {}
class Child extends Base {
  constructor() {
    this.ready = true;
    super();
  }
}
new Child();

// 独立运行：退出状态为 1；诊断包含 ReferenceError；Must call super constructor。

// 所属章节：10-类与类型检查
// 演示知识点：初始化检查、private/protected/readonly、抽象类、implements 与 override 的类型错误反例
// 运行命令：npm run errors:10（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
export {};

class InstanceOnly { title = "类"; }
const constructorAsInstance: InstanceOnly = InstanceOnly; // 构造函数值没有实例的 title 字段。

class Uninitialized { title: string; } // 严格初始化检查：没有初始值且构造函数未赋值。

class ProtectedEntry {
  private revision = 0;
  protected prefix = "课";
  readonly id = 1;
}
const hidden = new ProtectedEntry();
hidden.revision; // private 不能在声明类外正常访问。
hidden.prefix; // protected 不能在任意外部代码访问。
hidden.id = 2; // 构造完成后不能给只读字段重新赋值。
class FirstPrivate { private id = 1; }
class SecondPrivate { private id = 1; }
const separateOrigin: FirstPrivate = new SecondPrivate(); // private 成员来自不同声明。

abstract class AbstractTask { abstract run(): string; }
new AbstractTask(); // 抽象类不能直接实例化。
class MissingTask extends AbstractTask {} // 非抽象派生类缺少 run 实现。
interface NeedsRun { run(value: string): string; }
class MissingImplementation implements NeedsRun {} // implements 不会生成 run。
class Uninferred implements NeedsRun {
  run(value) { return value; } // implements 不为这里的参数提供类型，strict 下隐式 any 被拒绝。
}

class OverrideBase { label(): string { return "基础"; } }
class ForgottenOverride extends OverrideBase {
  label(): string { return "派生"; } // noImplicitOverride 要求显式 override。
}
class WrongOverride extends OverrideBase {
  override label(required: number): string { return String(required); } // 基类允许无参数调用。
}

class StaticGeneric<T> { static initial: T; } // 静态成员不能引用类的实例类型参数 T。

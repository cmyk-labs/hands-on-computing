// 所属章节：19-声明合并与模块扩充
// 演示知识点：同名非函数成员类型冲突、类型别名与类的重复声明反例
// 运行命令：npm run errors:19（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
interface Conflict { value: number }
interface Conflict { value: string } // 同名非函数成员不能改成另一类型。
type Alias = { id: number };
type Alias = { name: string }; // 类型别名不支持这种合并。
class Duplicate {}
class Duplicate {} // 类不能这样重复声明。
export {};
// 预期诊断包含：TS2717, TS2300。

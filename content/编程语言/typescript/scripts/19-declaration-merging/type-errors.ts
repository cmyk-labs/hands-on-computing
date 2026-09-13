interface Conflict { value: number }
interface Conflict { value: string } // 同名非函数成员不能改成另一类型。
type Alias = { id: number };
type Alias = { name: string }; // 类型别名不支持这种合并。
class Duplicate {}
class Duplicate {} // 类不能这样重复声明。
export {};
// 预期诊断包含：TS2717, TS2300。

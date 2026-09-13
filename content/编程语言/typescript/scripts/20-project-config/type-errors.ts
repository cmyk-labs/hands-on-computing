const values: number[] = [1];
const first: number = values[0]; // 开启索引检查后可能为 undefined。
const options: { label?: string } = { label: undefined }; // 可选不等于允许显式 undefined。
class Base { title() { return "基础"; } }
class Child extends Base { title() { return "子类"; } } // 需要 override。
export {};
// 预期诊断包含：TS2322, TS2375, TS4114。

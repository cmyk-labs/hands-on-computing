// 所属章节：08-类型兼容性
// 演示知识点：方法兼容性放行 number 输入后的运行时健全性边界
// 运行命令：node .build/08-type-compatibility/method-runtime-error.js（工作目录 content/编程语言/typescript）
// 期望结果：退出码 1，抛出 TypeError，消息包含 value.toUpperCase is not a function
export {};
interface MethodView { handle(value: string | number): string; }
const specialized = { handle(value: string): string { return value.toUpperCase(); } };
const methodView: MethodView = specialized;
methodView.handle(3); // TypeError：方法兼容性没有让 number 获得字符串方法。

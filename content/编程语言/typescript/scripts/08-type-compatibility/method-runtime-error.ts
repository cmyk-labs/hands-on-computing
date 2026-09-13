export {};
interface MethodView { handle(value: string | number): string; }
const specialized = { handle(value: string): string { return value.toUpperCase(); } };
const methodView: MethodView = specialized;
methodView.handle(3); // TypeError：方法兼容性没有让 number 获得字符串方法。

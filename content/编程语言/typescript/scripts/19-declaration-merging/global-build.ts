// 所属章节：19-声明合并与模块扩充
// 演示知识点：declare global 全局变量扩充与赋值
// 运行命令：npm run run:19（工作目录 content/编程语言/typescript）
// 期望结果：主入口读取 chapter19Build 输出 local
export {};
declare global {
  var chapter19Build: string | undefined;
}
globalThis.chapter19Build = "local";

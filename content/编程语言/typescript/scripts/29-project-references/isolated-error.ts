// 所属章节：29-项目引用与编译性能
// 演示知识点：缺少可独立生成声明条件的反例
// 运行命令：npm run errors:29（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，TS9013 见行内注释；不生成或执行 JavaScript
export function makeLabel() { return ["Ada"].join(""); } // TS9013：此返回表达式不能仅凭局部语法推导声明。

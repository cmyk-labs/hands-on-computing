// 所属章节：17-模块与模块解析
// 演示知识点：模块级作用域——与 scope-module-a 同名局部名称各自独立
// 运行命令：npm run check:17（工作目录 content/编程语言/typescript）
// 期望结果：类型检查正常退出；文件仅参与编译，不被导入执行
const localName = "乙";
export {};

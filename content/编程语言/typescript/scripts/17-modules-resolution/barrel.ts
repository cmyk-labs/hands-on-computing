// 所属章节：17-模块与模块解析
// 演示知识点：类型与值的再导出桶文件
// 运行命令：npm run run:17（工作目录 content/编程语言/typescript）
// 期望结果：主入口经桶文件取得 total 与 unit，正常退出
export type { Entry } from "./model.js";
export { total, unit } from "./model.js";

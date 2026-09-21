// 所属章节：17-模块与模块解析
// 演示知识点：被桶文件再导出与动态导入消费的模型模块（接口、函数、常量）
// 运行命令：npm run run:17（工作目录 content/编程语言/typescript）
// 期望结果：随主入口输出 4 小时 小时 6，正常退出
export interface Entry { title: string; hours: number }
export function total(entry: Entry): number { return entry.hours * 2; }
export const unit = "小时";

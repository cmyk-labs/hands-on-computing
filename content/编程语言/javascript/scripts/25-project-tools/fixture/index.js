// 所属章节：25-项目组织与工程工具
// 演示知识点：fixture 包公共入口，经 #number 私有子路径导入并转发 triple
// 运行命令：npm run check:25（工作目录 content/编程语言/javascript）
// 期望结果：自身无输出，经 consumer.mjs 以包名导入后 triple(4) 为 12
import { triple } from "#number";
export { triple };

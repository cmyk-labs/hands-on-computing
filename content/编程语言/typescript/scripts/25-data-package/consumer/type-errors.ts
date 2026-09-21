// 所属章节：25-综合工程实践
// 演示知识点：安装声明下 mapValues 返回类型反例
// 运行命令：npm run pack:25（工作目录 content/编程语言/typescript）
// 期望结果：pack 检查中消费者错误配置退出码 1，含 TS2322；不生成或执行 JavaScript
import { mapValues } from "notebook-readings-ts-c";
const texts: string[] = mapValues([1], item => item + 1);

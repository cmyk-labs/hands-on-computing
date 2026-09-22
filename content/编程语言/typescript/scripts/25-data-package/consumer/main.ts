// 所属章节：25-综合工程实践
// 演示知识点：只通过安装包调用 loadReadings 与 mapValues 的消费者
// 运行命令：npm run pack:25（工作目录 content/编程语言/typescript）
// 期望结果：输出 installed readings OK 温度 18
import { loadReadings, mapValues, type Reading } from "notebook-readings-ts-c";
const result = await loadReadings(async () => [{ sensor: " 温度 ", value: 18 }]);
// 失败分支先退出，后续才能把联合结果收窄为带 value 的成功分支。
if (!result.ok) throw new Error(result.message);
const rows: Reading[] = result.value;
const values: number[] = mapValues(rows, row => row.value);
console.log("installed readings OK", rows[0]?.sensor, values[0]); // → installed readings OK 温度 18

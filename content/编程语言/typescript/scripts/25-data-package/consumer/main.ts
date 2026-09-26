// 所属章节：25-综合工程实践
// 演示知识点：只通过安装包调用 loadReadings 与 mapValues 的消费者
// 运行命令：npm run pack:25（工作目录 content/编程语言/typescript）
// 期望结果：输出 installed readings OK 温度 18
import { loadReadings, mapValues, type Reading } from "notebook-readings-ts-c";
const result = await loadReadings(async () => [{ sensor: " 温度 ", value: 18 }]);
if (result.ok) {
  const rows: Reading[] = result.value;
  const values: number[] = mapValues(rows, row => row.value);
  console.log("installed readings OK", rows[0].sensor, values[0]); // → installed readings OK 温度 18
} else {
  console.log("读取失败", result.code, result.message); // 练习中来源拒绝时显示 source 与拒绝原因。
}

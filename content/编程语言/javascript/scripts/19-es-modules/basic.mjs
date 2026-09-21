// 所属章节：19-ES 模块
// 演示知识点：默认导入与具名导入的别名写法
// 运行命令：node scripts/19-es-modules/basic.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 90 分钟
import label, { sum as total, minutesPerHour } from "./math.mjs";
console.log(label(total(minutesPerHour, 30)));

// 按本例输入运行，输出依次为：
// 90 分钟

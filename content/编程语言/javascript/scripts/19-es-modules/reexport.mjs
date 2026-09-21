// 所属章节：19-ES 模块
// 演示知识点：从公共入口导入并检查可见导出集合
// 运行命令：node scripts/19-es-modules/reexport.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 describe,math,minutesPerHour,sum、15 分钟 60 与 false
import * as api from "./public-api.mjs";
console.log(Object.keys(api).join(","));
console.log(api.describe(api.sum(5, 10)), api.math.minutesPerHour);
console.log(Object.hasOwn(api, "default"));

// 按本例输入运行，输出依次为：
// describe,math,minutesPerHour,sum
// 15 分钟 60
// false

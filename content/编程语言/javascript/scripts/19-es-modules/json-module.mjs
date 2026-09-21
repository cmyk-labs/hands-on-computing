// 所属章节：19-ES 模块
// 演示知识点：带 with { type: "json" } 导入属性导入 JSON 模块
// 运行命令：node scripts/19-es-modules/json-module.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出 模块 3
import settings from "./settings.json" with { type: "json" };
console.log(settings.title, settings.chapters);

// 按本例输入运行，输出依次为：
// 模块 3

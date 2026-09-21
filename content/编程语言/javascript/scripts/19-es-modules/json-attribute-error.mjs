// 所属章节：19-ES 模块
// 演示知识点：JSON 导入缺少类型属性的独立反例
// 运行命令：node scripts/19-es-modules/json-attribute-error.mjs（工作目录 content/编程语言/javascript）
// 期望结果：ERR_IMPORT_ATTRIBUTE_MISSING：needs an import attribute of "type: json"，退出状态为 1
import settings from "./settings.json";
console.log(settings.title);

// 独立运行：退出状态为 1；诊断包含 ERR_IMPORT_ATTRIBUTE_MISSING；needs an import attribute of "type: json"。

import { title } from "./settings.json" with { type: "json" };
console.log(title);

// 独立运行：退出状态为 1；诊断包含 SyntaxError；does not provide an export named 'title'。

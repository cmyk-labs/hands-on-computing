// 所属章节：24-类型声明生成与包分发
// 演示知识点：包源码层面 greet 参数类型反例
// 运行命令：npm run errors:24（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
import { greet } from "./package/src/index.js";
greet(7); // TS2345：公共参数要求 string。

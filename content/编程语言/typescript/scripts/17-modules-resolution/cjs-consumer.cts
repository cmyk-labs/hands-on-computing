// 所属章节：17-模块与模块解析
// 演示知识点：CommonJS 通过动态 import() 消费 ESM 模块
// 运行命令：npm run run:17（工作目录 content/编程语言/typescript）
// 期望结果：输出 CJS->ESM 17，正常退出
import("./esm-value.mjs").then(module => console.log("CJS->ESM", module.esmValue));
// 预期输出：CJS->ESM 17

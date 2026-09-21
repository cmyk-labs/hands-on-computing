// 所属章节：01-TypeScript 与工具链
// 演示知识点：类型检查通过仍运行失败的反例：JSON.parse 解析不完整 JSON 文本
// 运行命令：node .build/01-typescript-toolchain/runtime-error.js（工作目录 content/编程语言/typescript）
// 期望结果：非零退出并抛出 SyntaxError，具体措辞由 Node.js 决定
JSON.parse("{"); // 类型检查通过；运行时抛出 SyntaxError，因为 JSON 文本不完整

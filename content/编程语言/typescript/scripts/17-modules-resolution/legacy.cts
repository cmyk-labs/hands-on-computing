// 所属章节：17-模块与模块解析
// 演示知识点：export = 形式的 CommonJS 模块及其默认导入消费
// 运行命令：npm run run:17（工作目录 content/编程语言/typescript）
// 期望结果：主入口输出 legacy.double(3) 的结果 6
const legacy = { double(value: number) { return value * 2; } };
export = legacy;

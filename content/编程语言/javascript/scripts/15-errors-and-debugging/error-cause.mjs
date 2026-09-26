// 所属章节：15-异常处理与调试
// 演示知识点：自定义错误子类与 options.cause 原因链
// 运行命令：node scripts/15-errors-and-debugging/error-cause.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
class ConfigError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "ConfigError";
  }
}
function loadConfig(text) {
  try { return JSON.parse(text); }
  catch (cause) {
    if (!(cause instanceof SyntaxError)) throw cause;
    throw new ConfigError("学习配置不是有效 JSON", { cause });
  }
}
try { loadConfig('{"title":}'); }
catch (error) {
  console.log(error.name, error.message, error.cause.name);
  console.log(error instanceof Error);
}

// 按本例输入运行，输出依次为：
// ConfigError 学习配置不是有效 JSON SyntaxError
// true

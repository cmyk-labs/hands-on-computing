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
  if (!(error instanceof ConfigError) || !(error.cause instanceof SyntaxError)) throw error;
  console.log(error.name, error.message, error.cause.name);
  console.log(error instanceof Error);
}

// 按本例输入运行，输出依次为：
// ConfigError 学习配置不是有效 JSON SyntaxError
// true

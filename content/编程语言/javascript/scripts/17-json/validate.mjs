// 所属章节：17-JSON 与数据转换
// 演示知识点：解析之后按字段约定校验并抛出带说明的 TypeError
// 运行命令：node scripts/17-json/validate.mjs（工作目录 content/编程语言/javascript）
// 期望结果：合法输入输出 {"title":"JS","minutes":30}，两份非法输入各打印一条错误消息
function parseLesson(text) {
  // 先让 JSON.parse 检查语法，再按本节约定检查对象和字段。
  const value = JSON.parse(text);
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("学习记录必须是对象");
  }
  if (!Object.hasOwn(value, "title") || !Object.hasOwn(value, "minutes") ||
      Object.keys(value).some(key => key !== "title" && key !== "minutes") ||
      typeof value.title !== "string" || value.title.trim() === "" ||
      !Number.isSafeInteger(value.minutes) || value.minutes < 0) {
    throw new TypeError("学习记录字段不符合约定");
  }
  return { title: value.title, minutes: value.minutes };
}
console.log(JSON.stringify(parseLesson('{"title":"JS","minutes":30}')));
// 这两个反例专门展示校验边界；只捕获预期类型，其他异常直接传播。
for (const input of ['null', '{"title":"JS","minutes":-1}']) {
  try { parseLesson(input); }
  catch (error) {
    if (!(error instanceof TypeError)) throw error;
    console.log(error.message);
  }
}

// 按本例输入运行，输出依次为：
// {"title":"JS","minutes":30}
// 学习记录必须是对象
// 学习记录字段不符合约定

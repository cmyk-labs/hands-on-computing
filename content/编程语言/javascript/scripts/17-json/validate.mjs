function parseLesson(text) {
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

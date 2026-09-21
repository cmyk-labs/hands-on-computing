// 所属章节：17-JSON 与数据转换
// 演示知识点：白名单数组 replacer 与函数式 replacer 的键值转换
// 运行命令：node scripts/17-json/replacer.mjs（工作目录 content/编程语言/javascript）
// 期望结果：输出白名单结果、minutes 乘以 60 的转换与 [null,2]
const data = { title: "JS", minutes: 30, internal: "草稿", detail: { minutes: 5, internal: "临时" } };
console.log(JSON.stringify(data, ["title", "minutes", "detail"]));
const transformed = JSON.stringify(data, (key, value) => {
  if (key === "internal") return undefined;
  if (key === "minutes") return value * 60;
  return value;
});
console.log(transformed);
console.log(JSON.stringify([1, 2], (key, value) => key === "0" ? undefined : value));

// 按本例输入运行，输出依次为：
// {"title":"JS","minutes":30,"detail":{"minutes":5}}
// {"title":"JS","minutes":1800,"detail":{"minutes":300}}
// [null,2]

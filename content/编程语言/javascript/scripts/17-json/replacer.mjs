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

const stages = [];
const item = {
  title: "JS",
  internal: "草稿",
  toJSON(key) { stages.push("toJSON:" + key); return { title: this.title }; }
};
console.log(JSON.stringify({ item }, (key, value) => {
  if (key === "item") stages.push("replacer:item");
  return value;
}));
console.log(stages.join(","));
const text = JSON.stringify({ createdAt: new Date("2025-01-02T03:04:05Z") });
console.log(text, typeof JSON.parse(text).createdAt);
console.log(JSON.stringify(new Date(NaN)));
console.log(JSON.stringify({ id: 9007199254740993n }, (key, value) =>
  typeof value === "bigint" ? value.toString() : value));

// 按本例输入运行，输出依次为：
// {"item":{"title":"JS"}}
// toJSON:item,replacer:item
// {"createdAt":"2025-01-02T03:04:05.000Z"} string
// null
// {"id":"9007199254740993"}

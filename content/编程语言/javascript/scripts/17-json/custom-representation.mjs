// 所属章节：17-JSON 与数据转换
// 演示知识点：toJSON 与 replacer 的执行顺序、Date 序列化与 BigInt 字符串化
// 运行命令：node scripts/17-json/custom-representation.mjs（工作目录 content/编程语言/javascript）
// 期望结果：toJSON 先于 replacer 执行；Date 转 ISO 字符串；BigInt 输出 {"id":"9007199254740993"}
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

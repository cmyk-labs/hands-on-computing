const visited = [];
const value = JSON.parse('{"id":"9007199254740993","nested":{"drop":1,"keep":2}}', (key, item) => {
  visited.push(key === "" ? "<root>" : key);
  if (key === "drop") return undefined;
  if (key === "id" && typeof item === "string" && /^[0-9]+$/.test(item)) return BigInt(item);
  return item;
});
console.log(value.id === 9007199254740993n, Object.hasOwn(value.nested, "drop"));
console.log(visited.join(","));
const sparse = JSON.parse("[1,2]", (key, item) => key === "0" ? undefined : item);
console.log(sparse.length, 0 in sparse, sparse[1]);
console.log(JSON.parse("1", () => undefined) === undefined);

// 按本例输入运行，输出依次为：
// true false
// id,drop,keep,nested,<root>
// 2 false 2
// true

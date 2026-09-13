const resource = new URL("./settings.json", import.meta.url);
console.log(new URL(import.meta.url).protocol);
console.log(resource.pathname.endsWith("/scripts/19-es-modules/settings.json"));
console.log(resource.protocol === "file:");

// 按本例输入运行，输出依次为：
// file:
// true
// true

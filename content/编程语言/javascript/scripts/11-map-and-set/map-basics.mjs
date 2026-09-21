// 所属章节：11-Map 与 Set
// 演示知识点：Map 的 set/get/has/delete/clear 与缺失值，普通属性不属于键
// 运行命令：node scripts/11-map-and-set/map-basics.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
const hours = new Map([["语法", 2], ["集合", 3]]);
console.log(hours.set("语法", 4) === hours, hours.size, hours.get("语法"));
hours.set("待安排", undefined);
console.log(hours.get("待安排"), hours.has("待安排"), hours.has("不存在"));
hours.note = "普通属性";
console.log(hours.has("note"), hours.note);
console.log(hours.delete("集合"), hours.delete("集合"));
console.log(hours.clear(), hours.size);

// 按本例输入运行，输出依次为：
// true 2 4
// undefined true false
// false 普通属性
// true false
// undefined 0

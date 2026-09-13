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

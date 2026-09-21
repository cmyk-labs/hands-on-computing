// 所属章节：12-this 与调用方式
// 演示知识点：方法内部箭头函数与对象中箭头属性的词法 this
// 运行命令：node scripts/12-this-and-calls/lexical-this.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
const topArrow = () => this;
const misleading = { topArrow };
console.log(misleading.topArrow() === undefined);
const session = {
  prefix: "JS",
  labelAll(names) {
    return names.map(name => this.prefix + ":" + name);
  },
  makeReader() { return () => this.prefix; }
};
console.log(session.labelAll(["集合", "模块"]).join(","));
const read = session.makeReader();
console.log(read.call({ prefix: "TS" }));

// 按本例输入运行，输出依次为：
// true
// JS:集合,JS:模块
// JS

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

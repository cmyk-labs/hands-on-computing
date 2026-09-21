// 所属章节：14-类与继承
// 演示知识点：静态字段、静态块与静态方法及其初始化顺序
// 运行命令：node scripts/14-classes/static-members.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
const events = [];
class Catalog {
  static prefix = (events.push("字段"), "JS");
  static titles;
  static {
    events.push("静态块");
    this.titles = [this.prefix + " 基础"];
  }
  static count() { return this.titles.length; }
  constructor() { events.push("实例"); }
}
const first = new Catalog();
new Catalog();
console.log(events.join(","));
console.log(Catalog.count(), Catalog.titles[0], typeof first.count);

// 按本例输入运行，输出依次为：
// 字段,静态块,实例,实例
// 1 JS 基础 undefined

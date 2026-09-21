// 所属章节：14-类与继承
// 演示知识点：super 传入父类初始化、方法覆盖与静态成员继承
// 运行命令：node scripts/14-classes/inheritance.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
class Lesson {
  static kind = "教学";
  #title;
  constructor(title) { this.#title = title; }
  describe() { return this.#title; }
}
class Lab extends Lesson {
  constructor(title, minutes) {
    super(title);
    this.minutes = minutes;
  }
  describe() { return super.describe() + ":" + this.minutes; }
}
const lab = new Lab("类", 15);
console.log(lab.describe(), lab instanceof Lab, lab instanceof Lesson);
console.log(Lab.kind, Object.getPrototypeOf(Lab) === Lesson);
console.log(Object.getPrototypeOf(Lab.prototype) === Lesson.prototype);

// 按本例输入运行，输出依次为：
// 类:15 true true
// 教学 true
// true

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

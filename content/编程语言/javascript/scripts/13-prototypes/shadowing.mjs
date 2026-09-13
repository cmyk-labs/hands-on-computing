const defaults = { level: 1 };
const student = Object.create(defaults);
student.level = 2;
console.log(student.level, defaults.level, Object.hasOwn(student, "level"));
delete student.level;
console.log(student.level, Object.hasOwn(student, "level"));
const accessors = {
  set score(value) { this.savedScore = value; },
  get score() { return this.savedScore; }
};
const report = Object.create(accessors);
report.score = 8;
console.log(report.score, Object.hasOwn(report, "score"), Object.hasOwn(report, "savedScore"));

// 按本例输入运行，输出依次为：
// 2 1 true
// 1 false
// 8 false true

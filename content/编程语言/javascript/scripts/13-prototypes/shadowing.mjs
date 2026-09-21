// 所属章节：13-原型与原型链
// 演示知识点：自身属性遮蔽原型属性、删除后回退、继承访问器写入自身属性
// 运行命令：node scripts/13-prototypes/shadowing.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
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

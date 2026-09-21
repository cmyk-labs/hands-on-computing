// 所属章节：14-类与继承
// 演示知识点：通过组合注入格式化函数替换能力
// 运行命令：node scripts/14-classes/composition.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
class Reporter {
  constructor(formatter) { this.formatter = formatter; }
  render(title) { return this.formatter(title); }
}
const plain = new Reporter(title => title);
const labeled = new Reporter(title => "课程:" + title);
console.log(plain.render("继承"), labeled.render("组合"));

// 按本例输入运行，输出依次为：
// 继承 课程:组合

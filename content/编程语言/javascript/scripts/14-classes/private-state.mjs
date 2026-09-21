// 所属章节：14-类与继承
// 演示知识点：私有字段与私有方法、公开访问器校验、同类实例互访
// 运行命令：node scripts/14-classes/private-state.mjs（工作目录 content/编程语言/javascript）
// 期望结果：按正文顺序输出各示例值，与行内注释一致
class Progress {
  #amount = 0;
  #valid(value) { return Number.isInteger(value) && value >= 0; }
  get amount() { return this.#amount; }
  set amount(value) {
    if (!this.#valid(value)) throw new RangeError("amount 必须为非负整数");
    this.#amount = value;
  }
  sameAs(other) { return this.#amount === other.#amount; }
}
const first = new Progress();
const second = new Progress();
first.amount = 3;
second.amount = 3;
console.log(first.amount, first.sameAs(second));
console.log(Object.keys(first).length, first["#amount"]);

// 按本例输入运行，输出依次为：
// 3 true
// 0 undefined

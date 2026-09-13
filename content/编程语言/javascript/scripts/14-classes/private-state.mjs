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

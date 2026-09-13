const events = [];
class Base {
  base = (events.push("基类字段"), 1);
  constructor() { events.push("基类构造:" + this.describe()); }
  describe() { return "base"; }
  set count(value) { events.push("setter:" + value); }
}
class Child extends Base {
  detail = (events.push("子类字段"), "ready");
  count = 2;
  constructor() {
    events.push("super前");
    super();
    events.push("super后:" + this.detail);
  }
  describe() { return this.detail; }
}
const child = new Child();
console.log(events.join(","));
console.log(child.count, Object.hasOwn(child, "count"));

// 按本例输入运行，输出依次为：
// super前,基类字段,基类构造:undefined,子类字段,super后:ready
// 2 true

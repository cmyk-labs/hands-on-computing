import assert from "node:assert/strict";
import { events, trace, register, trimField } from "./decorators.js";
@register
class Greeter {
  @trimField name = " Ada ";
  @trace("outer")
  @trace("inner")
  greet(prefix: string): string { return prefix + this.name; }
}
const greeter = new Greeter();
assert.equal(greeter.greet("Hi "), "Hi Ada");
assert.equal(greeter.name, "Ada");
assert.deepEqual(events, [
  "evaluate outer", "evaluate inner", "apply inner:greet", "apply outer:greet",
  "apply field name", "class class:Greeter", "class ready Greeter", "init inner", "init outer",
  "initialize field name",
  "call outer", "call inner"
]);
console.log(events.join(" | ")); // 与上述顺序一致。
console.log(greeter.greet("Hi ")); // Hi Ada。

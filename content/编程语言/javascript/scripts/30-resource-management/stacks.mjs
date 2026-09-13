import assert from "node:assert/strict";
const events = [];
const setup = new DisposableStack();
setup.use({ [Symbol.dispose]() { events.push("use"); } });
assert.equal(setup.adopt("fd-7", (value) => events.push(`adopt:${value}`)), "fd-7");
setup.defer(() => events.push("defer"));
const owned = setup.move();
assert.equal(setup.disposed, true);
setup.dispose();
assert.equal(events.length, 0);
assert.throws(() => setup.defer(() => {}), ReferenceError);
{
  using scope = owned;
}
owned.dispose();
assert.deepEqual(events, ["defer", "adopt:fd-7", "use"]);
console.log(events.join(",")); // → defer,adopt:fd-7,use

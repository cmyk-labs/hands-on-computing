import assert from "node:assert/strict";
const events = [];
const stack = new AsyncDisposableStack();
stack.use({ async [Symbol.asyncDispose]() {
  events.push("resource start");
  await Promise.resolve();
  events.push("resource end");
} });
stack.adopt("token", async (value) => {
  events.push(`adopt:${value}`);
  await Promise.resolve();
});
stack.defer(async () => {
  events.push("defer start");
  await Promise.resolve();
  events.push("defer end");
});
await stack.disposeAsync();
await stack.disposeAsync();
assert.equal(stack.disposed, true);
assert.deepEqual(events, ["defer start", "defer end", "adopt:token", "resource start", "resource end"]);
console.log(events.join(",")); // → defer start,defer end,adopt:token,resource start,resource end

import assert from "node:assert/strict";
assert.equal(typeof Symbol.dispose, "symbol");
assert.equal(typeof Symbol.asyncDispose, "symbol");
assert.equal(typeof DisposableStack, "function");
assert.equal(typeof AsyncDisposableStack, "function");
assert.equal(typeof SuppressedError, "function");
const events = [];
{
  using sync = { [Symbol.dispose]() { events.push("sync"); } };
  await using asyncResource = { async [Symbol.asyncDispose]() { await Promise.resolve(); events.push("async"); } };
}
assert.deepEqual(events, ["async", "sync"]);
console.log("syntax and resource builtins available"); // → syntax and resource builtins available

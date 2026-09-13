import assert from "node:assert/strict";
const target = { status: "open" };
const { proxy, revoke } = Proxy.revocable(target, {});
const value = proxy.status;
revoke();
revoke();
assert.throws(() => proxy.status, TypeError);
assert.equal(value, "open");
assert.equal(target.status, "open");
console.log("revoked proxy retained value", value); // → revoked proxy retained value open

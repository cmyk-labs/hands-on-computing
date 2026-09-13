import assert from "node:assert/strict";
const first = await import("./feature.mjs");
const second = await import("./feature.mjs");
assert.equal(first, second);
console.log(first.scale(4)); // → 12
await assert.rejects(import("./not-present.mjs"), { code: "ERR_MODULE_NOT_FOUND" });
console.log("missing module rejected"); // → missing module rejected

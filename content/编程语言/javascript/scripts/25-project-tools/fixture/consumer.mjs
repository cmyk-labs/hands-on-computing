import assert from "node:assert/strict";
import { triple } from "notebook-tools-fixture";
import legacy from "./legacy.cjs";
assert.equal(triple(4), 12);
assert.equal(legacy.label, "CommonJS");
await assert.rejects(import("notebook-tools-fixture/number.js"), {
  code: "ERR_PACKAGE_PATH_NOT_EXPORTED",
});
console.log("exports imports CommonJS checked"); // → exports imports CommonJS checked

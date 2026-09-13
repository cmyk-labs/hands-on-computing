import test from "node:test";
import assert from "node:assert/strict";
test("isolated A", () => {
  assert.equal(globalThis.notebookTestMarker, undefined);
  globalThis.notebookTestMarker = "A";
});

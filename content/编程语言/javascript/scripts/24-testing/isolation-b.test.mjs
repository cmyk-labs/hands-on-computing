import test from "node:test";
import assert from "node:assert/strict";
test("isolated B", () => {
  assert.equal(globalThis.notebookTestMarker, undefined);
  globalThis.notebookTestMarker = "B";
});

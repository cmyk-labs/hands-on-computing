import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { summarizeRows } from "notebook-data-summary";
import { createReport } from "notebook-data-summary/io";

assert.equal(fileURLToPath(import.meta.resolve("notebook-data-summary")), resolve("node_modules/notebook-data-summary/index.mjs"));
assert.equal(typeof createReport, "function");
assert.deepEqual(summarizeRows([{ group: "installed", amountCents: 25, active: true }]), [
  { group: "installed", count: 1, totalCents: 25 },
]);
await assert.rejects(import("notebook-data-summary/validate.mjs"), { code: "ERR_PACKAGE_PATH_NOT_EXPORTED" });
console.log("installed import source verified"); // → installed import source verified

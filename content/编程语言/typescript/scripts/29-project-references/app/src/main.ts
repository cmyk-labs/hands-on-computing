import assert from "node:assert/strict";
import { total } from "../../core/dist/index.js";
const amount = total([{ price: 4 }, { price: 6 }]);
assert.equal(amount, 10);
console.log("total", amount); // total 10。

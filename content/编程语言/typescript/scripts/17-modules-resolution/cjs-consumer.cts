import("./esm-value.mjs").then(
  module => console.log("CJS->ESM", module.esmValue),
  error => { console.error(error); process.exitCode = 1; }
);
// 预期输出：CJS->ESM 17

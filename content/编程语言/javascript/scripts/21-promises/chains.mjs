Promise.resolve(2)
  .then((value) => value * 3)
  .then((value) => Promise.resolve(value + 1))
  .finally(() => 999)
  .then((value) => console.log("chain", value)); // → chain 7

Promise.resolve("input")
  .then(() => { throw new RangeError("callback failed"); }, () => "not reached")
  .catch((error) => {
    console.log(error.name, error.message); // → RangeError callback failed
    return "recovered";
  })
  .then((value) => console.log(value)); // → recovered

Promise.reject(new Error("operation failed"))
  .finally(() => { throw new Error("cleanup failed"); })
  .catch((error) => console.log(error.message)); // → cleanup failed

Promise.resolve(3).then(() => {}).then((value) => {
  console.log("missing return", value === undefined); // → missing return true
});

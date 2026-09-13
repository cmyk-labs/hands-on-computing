const order = [];
const result = Promise.try((value) => {
  order.push("callback");
  return value * 2;
}, 5);
order.push("caller");
result.then((value) => console.log(order.join(","), value)); // → callback,caller 10
Promise.try(() => { throw new TypeError("invalid input"); })
  .catch((error) => console.log(error.name, error.message)); // → TypeError invalid input

const button = document.querySelector("#run");
const output = document.querySelector("#output");
button.addEventListener("click", () => {
  button.disabled = true;
  const events = ["sync start"];
  Promise.resolve().then(() => events.push("promise"));
  queueMicrotask(() => events.push("microtask"));
  setTimeout(() => {
    events.push("timer");
    output.textContent = events.join("\n");
    console.log(events.join(",")); // → sync start,sync end,promise,microtask,timer
    button.disabled = false;
  }, 0);
  events.push("sync end");
});

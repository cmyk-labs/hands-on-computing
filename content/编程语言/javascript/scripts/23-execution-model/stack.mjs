const events = [];
function inner() { events.push("inner"); }
function outer() {
  events.push("outer before");
  Promise.resolve().then(() => {
    events.push("reaction");
    console.log(events.join(",")); // → outer before,inner,outer after,script after,reaction
  });
  inner();
  events.push("outer after");
}
outer();
events.push("script after");

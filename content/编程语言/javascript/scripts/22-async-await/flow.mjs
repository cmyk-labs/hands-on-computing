const events = [];
async function compute() {
  events.push("start");
  const value = await 4;
  events.push("resume");
  return value * 2;
}
const pending = compute();
events.push("caller");
console.log(await pending, events.join(",")); // → 8 start,caller,resume

async function handle() {
  try {
    return await Promise.reject(new Error("read failed"));
  } catch (error) {
    return error.message;
  } finally {
    events.push("cleanup");
  }
}
console.log(await handle(), events.at(-1)); // → read failed cleanup

async function forward() {
  try {
    return Promise.reject(new Error("forwarded"));
  } catch {
    return "not reached";
  }
}
console.log(await forward().catch((error) => error.message)); // → forwarded

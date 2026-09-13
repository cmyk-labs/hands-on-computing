export async function mapLimited(items, limit, worker) {
  if (!Number.isInteger(limit) || limit < 1) throw new RangeError("limit must be positive");
  const results = new Array(items.length);
  let nextIndex = 0;
  let failed = false;
  let firstError;
  async function consume() {
    while (!failed && nextIndex < items.length) {
      const index = nextIndex++;
      try {
        results[index] = await worker(items[index]);
      } catch (error) {
        if (!failed) { failed = true; firstError = error; }
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, consume));
  if (failed) throw firstError;
  return results;
}

export function mean(values) {
  if (!Array.isArray(values) || ![...values].every(Number.isFinite)) {
    throw new TypeError("expected finite numbers");
  }
  if (values.length === 0) return null;
  const sum = values.reduce((total, value) => total + value, 0);
  if (!Number.isFinite(sum)) throw new RangeError("sum exceeds finite range");
  return sum / values.length;
}

export async function loadMean(readText) {
  const text = await readText();
  return mean(JSON.parse(text));
}

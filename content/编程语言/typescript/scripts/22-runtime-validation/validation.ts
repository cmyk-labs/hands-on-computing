export interface Order { name: string; quantity: number }
export type Result =
  | { ok: true; value: Order }
  | { ok: false; reason: "json" | "shape" | "business" };

export function isOrder(value: unknown): value is Order {
  return (typeof value === "object" && value !== null || typeof value === "function")
    && "name" in value && typeof value.name === "string"
    && "quantity" in value && typeof value.quantity === "number";
}
export function assertOrder(value: unknown): asserts value is Order {
  if (!isOrder(value)) throw new TypeError("order shape");
}
export function validOrder(value: Order): boolean {
  return typeof value !== "function" && !Array.isArray(value)
    && value.name.trim().length > 0 && Number.isSafeInteger(value.quantity)
    && value.quantity >= 1 && value.quantity <= 100;
}
export function parseOrder(text: string): Result {
  let value: unknown;
  try { value = JSON.parse(text); }
  catch (error: unknown) {
    if (error instanceof SyntaxError) return { ok: false, reason: "json" };
    throw error;
  }
  if (!isOrder(value)) return { ok: false, reason: "shape" };
  if (!validOrder(value)) return { ok: false, reason: "business" };
  return { ok: true, value };
}

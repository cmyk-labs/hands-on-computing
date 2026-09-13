export function divide(left: number, right: number): number {
  if (right === 0) throw new RangeError("zero divisor");
  return left / right;
}
export async function divideAsync(left: number, right: number): Promise<number> {
  return divide(left, right);
}

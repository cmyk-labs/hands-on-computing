export function label(value) { return `读数:${value}`; }
export class Meter {
  constructor(start) { this.value = start; }
  add(step) { this.value += step; return this.value; }
}

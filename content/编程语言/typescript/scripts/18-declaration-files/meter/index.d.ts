export declare function label(value: number): string;
export declare class Meter {
  constructor(start: number);
  value: number;
  add(step: number): number;
}

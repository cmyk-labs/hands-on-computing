import { Gauge } from "./gauge.js";
declare module "./gauge.js" {
  interface Gauge { double(): number }
}
Gauge.prototype.double = function () { return this.value * 2; };

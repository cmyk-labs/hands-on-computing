import { trimField } from "./decorators.js";
class Invalid {
  @trimField count = 1; // TS1240、TS1270：字段类型不匹配。
}
function parameter(_value: unknown, _context: unknown) {}
class Parameters {
  method(@parameter value: string) { return value; }
}

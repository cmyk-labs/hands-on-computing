// 所属章节：27-装饰器
// 演示知识点：字段类型不匹配与新语义参数装饰器反例
// 运行命令：npm run errors:27（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
import { trimField } from "./decorators.js";
class Invalid {
  @trimField count = 1; // TS1240、TS1270：字段类型不匹配。
}
function parameter(_value: unknown, _context: unknown) {}
class Parameters {
  method(@parameter value: string) { return value; }
}

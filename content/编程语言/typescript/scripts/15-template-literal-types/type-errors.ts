// 所属章节：15-模板字面量类型
// 演示知识点：动作不在联合、模板不匹配为 never、回调值与 getter 返回类型反例
// 运行命令：npm run errors:15（工作目录 content/编程语言/typescript）
// 期望结果：类型检查非零退出，具体错误逐条见行内注释；不生成或执行 JavaScript
import { listener, type EventName, type ChangedKey, type Getters, type Model } from "./main.js";
const wrong: EventName = "lesson:save"; // save 不在动作联合中。
const unmatched: ChangedKey<"hours"> = "hours"; // 模板不匹配，结果为 never。
listener("missingChanged", () => {}); // missing 不属于 Model 的字符串键。
listener("hoursChanged", value => value.toUpperCase()); // 回调值为 number。
const wrongGetter: Getters<Model> = { getTitle: () => "标题", getHours: () => "3" }; // 返回值应为 number。
// 预期诊断包含：TS2322, TS2345, TS2339。

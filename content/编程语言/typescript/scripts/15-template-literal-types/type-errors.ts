import { listener, type EventName, type ChangedKey, type Getters, type Model } from "./main.js";
const wrong: EventName = "lesson:save"; // save 不在动作联合中。
const unmatched: ChangedKey<"hours"> = "hours"; // 模板不匹配，结果为 never。
listener("missingChanged", () => {}); // missing 不属于 Model 的字符串键。
listener("hoursChanged", value => value.toUpperCase()); // 回调值为 number。
const wrongGetter: Getters<Model> = { getTitle: () => "标题", getHours: () => "3" }; // 返回值应为 number。
// 预期诊断包含：TS2322, TS2345, TS2339。

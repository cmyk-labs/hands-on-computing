// 所属章节：15-模板字面量类型
// 演示知识点：模板拼接联合、infer 提取片段、大小写内置别名、getters 键重映射与事件监听回调
// 运行命令：npm run run:15（工作目录 content/编程语言/typescript）
// 期望结果：正常退出，各段预期输出与行内注释一致
export type Domain = "lesson" | "quiz";
type Action = "open" | "close";
export type EventName = `${Domain}:${Action}`;
const value: EventName = "lesson:open";
console.log(value);
// 预期输出：lesson:open

export type ChangedKey<S extends string> = S extends `${infer Key}Changed` ? Key : never;
const key: ChangedKey<"titleChanged"> = "title";
console.log(key);
// 预期输出：title

export type Model = { title: string; hours: number };
export function listener<K extends string & keyof Model>(event: `${K}Changed`, callback: (value: Model[K]) => void) {
  return (value: Model[K]) => {
    console.log(event);
    callback(value);
  };
}
const notifyHours = listener("hoursChanged", value => console.log(value.toFixed(1)));
notifyHours(3);
// 预期输出：hoursChanged
// 预期输出：3.0

const upper: Uppercase<"lessonId"> = "LESSONID";
const lower: Lowercase<"LessonID"> = "lessonid";
const capital: Capitalize<"lessonID"> = "LessonID";
const uncapital: Uncapitalize<"LessonID"> = "lessonID";
console.log(upper, lower, capital, uncapital);
// 预期输出：LESSONID lessonid LessonID lessonID

export type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P]
};
const getters: Getters<Model> = {
  getTitle: () => "模板",
  getHours: () => 3
};
console.log(getters.getTitle(), getters.getHours());
// 预期输出：模板 3

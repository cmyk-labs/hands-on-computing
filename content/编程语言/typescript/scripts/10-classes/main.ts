export {};
class Note {
  static category = "学习";
  title: string;
  constructor(title: string) { this.title = title; }
}
const instance: Note = new Note("类");
const creator: typeof Note = Note;
const factory: new (title: string) => Note = creator;
console.log(instance.title, creator.category, new factory("构造").title); // 类 学习 构造

class Draft {
  title: string;
  pages = 0;
  subtitle: string | undefined;
  constructor(title: string) { this.title = title; }
}
const draft = new Draft("初始化");
console.log(draft.title, draft.pages, draft.subtitle); // 初始化 0 undefined

class Entry {
  public title: string;
  private revision = 0;
  protected prefix = "课程:";
  readonly id: number;
  constructor(title: string, id: number) { this.title = title; this.id = id; }
  revise(): number { return ++this.revision; }
}
class PublishedEntry extends Entry {
  label(): string { return this.prefix + this.title; }
}
const entry = new PublishedEntry("类", 1);
console.log(entry.label(), entry.revise(), entry.id, Object.keys(entry).includes("revision")); // 课程:类 1 1 true

class Lesson {
  constructor(public readonly title: string, private minutes: number) {}
  summary(): string { return this.title + ":" + this.minutes; }
}
const lesson = new Lesson("参数属性", 10);
console.log(lesson.summary(), Object.keys(lesson).join(",")); // 参数属性:10 title,minutes

interface Renderable { render(): string; }
abstract class DocumentBase {
  abstract render(): string;
  describe(): string { return "文档:" + this.render(); }
}
class TextDocument extends DocumentBase implements Renderable {
  constructor(public text: string) { super(); }
  override render(): string { return this.text; }
}
function buildDocument(creator: new (text: string) => DocumentBase): DocumentBase {
  return new creator("抽象类");
}
console.log(buildDocument(TextDocument).describe()); // 文档:抽象类

class BaseLabel { label(): string { return "基础"; } }
class DetailedLabel extends BaseLabel {
  override label(): string { return super.label() + "/扩展"; }
}
console.log(new DetailedLabel().label()); // 基础/扩展

class Box<T> {
  value: T | undefined;
  set(value: T): this { this.value = value; return this; }
  hasValue(): this is this & { value: T } { return this.value !== undefined; }
}
class TextBox extends Box<string> { label = "文本"; }
const box = new TextBox().set("TS");
const size = box.hasValue() ? box.value.length : 0;
const empty = new Box<number>();
console.log(box.label, size, empty.hasValue()); // 文本 2 false

class Vault {
  private ordinary = 1;
  #secret = 2;
  read(): number { return this.#secret; }
}
const vault = new Vault();
console.log(Object.keys(vault).join(","), vault.read()); // ordinary 2

type Constructor = new (...args: any[]) => object;
function WithFlag<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    #enabled = false;
    enable(): void { this.#enabled = true; }
    isEnabled(): boolean { return this.#enabled; }
  };
}
const FlaggedNote = WithFlag(Note);
const flagged = new FlaggedNote("混入");
flagged.enable();
console.log(flagged.title, flagged.isEnabled()); // 混入 true

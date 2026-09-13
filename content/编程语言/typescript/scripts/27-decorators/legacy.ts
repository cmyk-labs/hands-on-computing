const legacyEvents: string[] = [];
function mark(_target: object, key: string | symbol | undefined, index: number): void {
  legacyEvents.push(String(key) + ":" + index);
}
class Legacy {
  greet(@mark name: string): string { return "Hi " + name; }
}
console.log(new Legacy().greet("Ada"), legacyEvents.join(","));
export {};

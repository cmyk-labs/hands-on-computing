function titleLength(title: string | null): number {
  return title!.length;
}
titleLength(null); // 类型检查通过；运行时 TypeError：! 没有检查 null

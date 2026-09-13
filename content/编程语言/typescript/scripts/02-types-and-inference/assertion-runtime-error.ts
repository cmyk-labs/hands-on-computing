const input: unknown = 12;
const text = input as string;
text.toUpperCase(); // 类型检查通过；运行时 TypeError：断言没有转换数值

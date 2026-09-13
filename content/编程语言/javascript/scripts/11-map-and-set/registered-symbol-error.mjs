const metadata = new WeakMap();
metadata.set(Symbol.for("shared"), 1);

// 独立运行：退出状态为 1；诊断包含 TypeError；Invalid value used as weak map key。

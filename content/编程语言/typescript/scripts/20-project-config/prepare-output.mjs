import { copyFileSync, mkdirSync } from "node:fs";
const output = new URL("../../.build/20-project-config/", import.meta.url);
mkdirSync(output, { recursive: true });
copyFileSync(new URL("./package.json", import.meta.url), new URL("./package.json", output));

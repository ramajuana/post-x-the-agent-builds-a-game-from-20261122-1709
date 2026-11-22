import { chmodSync, copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "POST.json");
const target = join(outDir, "POST.json");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
chmodSync(target, 0o644);

// Verify the copy landed byte for byte; a silent short write must fail loudly.
const written = readFileSync(target);
const expected = readFileSync(source);
if (!written.equals(expected)) {
  throw new Error(`POST.json copy mismatch: wrote ${written.length} bytes, expected ${expected.length}`);
}

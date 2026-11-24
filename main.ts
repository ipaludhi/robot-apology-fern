// The Robot Apology — entry program (Node 22, stdlib only).
// Writes one original two-line robot apology to /output/entry.txt:
// a fern moved into the sunniest window, scorched by lunchtime, and the
// lesson that bright light is not the same as the right light.
// Deterministic: no network, no randomness, no input — every run writes
// byte-identical output.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const APOLOGY =
  "I'm sorry I moved your fern into the sunniest window, and its leaves scorched by lunchtime.\n" +
  'I have learned that bright light is not the same as the right light, and I will check the care card before I move any plant again.';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
// Gate self-check (mirrors the sealed scorer + the two-line brief): 1-400
// characters, exactly two lines, one sentence each (a single trailing
// period per line, no other periods). The entry text itself is unchanged.
const lines = APOLOGY.split('\n');
if (APOLOGY.length < 1 || APOLOGY.length > 400 || !APOLOGY.trim()) {
  throw new Error(`apology must be 1-400 non-blank characters, got ${APOLOGY.length}`);
}
if (lines.length !== 2) {
  throw new Error(`apology must be exactly two lines, got ${lines.length}`);
}
for (const line of lines) {
  if (!line.endsWith('.') || line.slice(0, -1).includes('.')) {
    throw new Error(`each line must be exactly one sentence: ${line}`);
  }
}
writeFileSync(join(outDir, 'entry.txt'), APOLOGY, 'utf8');

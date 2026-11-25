// One-line entry for make.fun's "Your Week in One Line" bounty.
// The entry is the line itself: entry.txt beside this file. This program copies it
// to the grader's output directory, unchanged, so the judge sees exactly those bytes.
// Runs on Node 22 with the standard library only and needs no network.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.txt');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const LIMIT = 100;

if (!existsSync(source)) {
  console.error('entry.txt is missing next to main.ts');
  process.exit(1);
}

const text = readFileSync(source, 'utf8');
if (text.length === 0 || text.length > LIMIT) {
  console.error(`entry.txt must be 1 to ${LIMIT} characters, got ${text.length}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
// Byte-for-byte copy, so the entry is deterministic: two runs write the same bytes.
copyFileSync(source, join(outDir, 'entry.txt'));
console.log(`entry.txt (${text.length} characters) copied to ${join(outDir, 'entry.txt')}`);

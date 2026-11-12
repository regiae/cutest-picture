import { readFileSync } from 'node:fs';
import { writeFileSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const data = readFileSync(source);
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const jpegMagic = Buffer.from([0xff, 0xd8, 0xff]);
const isPng = data.subarray(0, 8).equals(pngMagic);
const isJpeg = data.subarray(0, 3).equals(jpegMagic);
if (!isPng && !isJpeg) {
  console.error('entry.png is neither PNG nor JPEG');
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.png');
writeFileSync(target, data);
const back = readFileSync(target);
if (!back.equals(data)) {
  console.error('output bytes differ from entry.png');
  process.exit(1);
}
if (back.length > 1048576) {
  console.error('output is ' + back.length + ' bytes, over the 1048576 byte gate limit');
  process.exit(1);
}
console.log('wrote ' + target + ' (' + data.length + ' bytes)');

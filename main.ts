// Cutest picture entry: a tiny cream kitten peeking out of a pastel teacup.
// This program copies the picture bundled beside it to the output folder,
// byte for byte, after checking it is a real JPEG or PNG and fits the
// competition's size limit.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1048576;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

const picture = readFileSync(source);

const isPng = picture.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC);
const isJpeg = picture.subarray(0, JPEG_MAGIC.length).equals(JPEG_MAGIC);
if (!isPng && !isJpeg) {
  console.error("entry.png is not a PNG or JPEG image");
  process.exit(1);
}

if (picture.length > MAX_BYTES) {
  console.error(`entry.png is ${picture.length} bytes, over the 1048576 byte limit`);
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
} catch (error) {
  console.error(`could not create output directory ${outDir}: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
writeFileSync(target, picture);

const written = readFileSync(target);
if (!written.equals(picture)) {
  console.error("output does not match the source image");
  process.exit(1);
}

console.log(`wrote ${target} (${written.length} bytes)`);

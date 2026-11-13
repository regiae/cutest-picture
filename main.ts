// Two baby penguins hugging cheek to cheek.
//
// This program ships the picture as entry.png next to it and copies that
// file into the output directory unchanged. The picture is a JPEG, so the
// output keeps the name entry.png either way, as the competition requires.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1048576;

const folder = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(folder, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.png");

const picture = readFileSync(sourcePath);

const isPng =
  picture[0] === 0x89 &&
  picture[1] === 0x50 &&
  picture[2] === 0x4e &&
  picture[3] === 0x47;
const isJpeg =
  picture[0] === 0xff && picture[1] === 0xd8 && picture[2] === 0xff;
if (!isPng && !isJpeg) {
  console.error("entry.png is neither a PNG nor a JPEG image");
  process.exit(1);
}

if (picture.length > MAX_BYTES) {
  console.error(`entry.png is ${picture.length} bytes, over the 1 MiB limit`);
  process.exit(1);
}

try {
  mkdirSync(outputDir, { recursive: true });
} catch (err) {
  if ((err as NodeJS.ErrnoException).code !== "EEXIST") throw err;
}
writeFileSync(outputPath, picture);

const written = readFileSync(outputPath);
if (!written.equals(picture)) {
  console.error("readback failed: the output differs from entry.png");
  process.exit(1);
}
if (written.length > MAX_BYTES) {
  console.error("the output is over the 1 MiB limit");
  process.exit(1);
}

console.log(`wrote ${outputPath} (${written.length} bytes)`);

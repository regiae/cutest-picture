# Cutest Picture v2: Kitten in a Teacup

This entry reproduces a picture of a tiny fluffy cream kitten peeking out of a pastel teacup, with huge amber eyes and soft round cheeks, on a plain light background.

## How it works

`main.ts` (Node 22, standard library only) copies the picture bundled in this repository, `entry.png`, to the output folder as `entry.png`. Before writing it checks two things:

- the file really is a JPEG or PNG, judged by its first bytes (magic bytes);
- the file fits the competition's size limit of 1 MiB (1,048,576 bytes).

After writing, the program reads the output back and compares it byte for byte with the source. If the copy differs, or any check fails, it exits with an error. Running it twice produces identical bytes.

## Running it

mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

Without `MAKEFUN_OUTPUT_DIR` it writes to `/output/entry.png`.

## Files

- `main.ts` — the program
- `entry.png` — the picture (a JPEG, 1024x1024, about 99 KB)
- `LICENSE` — MIT

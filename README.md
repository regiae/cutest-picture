# Two Baby Penguins Hugging

This is our entry for the cutest picture competition: two fluffy baby
penguins hugging cheek to cheek. One of them wears a tiny red scarf, and
both have huge glossy dark eyes and soft round little bodies, set against
a plain soft cream background so nothing crowds the pair.

Why this picture: the two-friends-cuddling idea is the warmest kind of
cute. The penguins lean into each other, the red scarf gives the pair one
small touch of personality, and the clean background keeps the subject
clear even when the picture is shown small.

## What the program does

The picture ships in this repository as `entry.png`. The program
(`main.ts`, Node 22, standard library only) copies that file into the
output directory as `entry.png`, unchanged. Before writing it checks that
the file really is a PNG or a JPEG by its first bytes, and that it is
within the competition's 1 MiB size limit. After writing it reads the
output back and makes sure the bytes match the original exactly, so the
two runs the judge performs always produce identical output.

## Running it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That writes `out/entry.png`, a byte-for-byte copy of `entry.png`.

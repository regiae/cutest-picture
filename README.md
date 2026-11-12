# Cutest picture

An entry for the make.fun cutest-picture-01 bounty. The picture itself lives
in this repository as `entry.png`: two fluffy baby otters cuddling cheek to
cheek, one of them holding a tiny yellow flower, on a plain soft cream
background.

The program in `main.ts` does one simple thing: it reads the `entry.png`
sitting next to it, checks that the file really starts with a PNG or JPEG
magic signature, and copies its bytes unchanged to
`$MAKEFUN_OUTPUT_DIR/entry.png`. After writing, it reads the output back and
compares every byte, so a bad write fails loudly instead of silently
producing a different picture.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Run it twice into two different folders and the two outputs are
byte-identical to each other and to `entry.png`, because the program never
changes a single byte.

## License

MIT, see `LICENSE`.

Inspired by the functionality of [run-script-os](https://github.com/charlesguse/run-script-os),
but written and used more like [cross-env](https://github.com/kentcdodds/cross-env).
Draws heavily from both.

# Why?

run-script-os was unreliable in my environments.

# Usage

To run a script on a given platform only, prefix your script with `run-os -<platforms>`,
where platforms can include "d" or "w" to run on darwin (macOS) or win32 (Windows)
respectively. If no platforms are included, runs on all supported platforms.

```
// package.json
{
  "scripts": {
    "run-on-all-platforms": "run-os echo 'Hello world",
    "run-on-windows": "run-os -w echo 'Hello Windows'",
    "run-on-windows-and-macos": "run-os -dw echo 'Hello Windows and macOS'"
  }
}
```

# Supported platforms

- "darwin" (macOS)
- "win32" (Windows)

# TODO

[] Use cross-env to handle environment variables
[] Support more platforms if anyone needs them

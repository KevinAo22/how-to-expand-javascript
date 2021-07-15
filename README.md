# How to expand JavaScript?

**Here is everything about improving JavaScript performance.**

## Native vs WebAssembly vs N-API Addon

Performance comparison of WebAssembly based on Rust, N-API Addon based on Rust, and native implementations in Node.js.

### AES128 Benchmark

```
CPU Arch: x64
CPU Info: Intel(R) Core(TM) i7-7820HQ CPU @ 2.90GHz
Memory Info: 16GB
Node version: v14.17.3
AES decrypt for 128KB data:
    Pure JavaScript x 61.94 ops/sec ±3.11% (65 runs sampled)
    Node Crypto x 6,912 ops/sec ±2.91% (85 runs sampled)
    WebAssembly x 438 ops/sec ±0.80% (87 runs sampled)
    N-API Addon x 10,011 ops/sec ±0.77% (93 runs sampled)
  Fastest is N-API Addon
AES decrypt for 256KB data:
    Pure JavaScript x 30.26 ops/sec ±2.38% (54 runs sampled)
    Node Crypto x 4,315 ops/sec ±3.64% (90 runs sampled)
    WebAssembly x 208 ops/sec ±0.81% (87 runs sampled)
    N-API Addon x 4,935 ops/sec ±1.98% (83 runs sampled)
  Fastest is N-API Addon
AES decrypt for 384KB data:
    Pure JavaScript x 20.09 ops/sec ±1.65% (37 runs sampled)
    Node Crypto x 2,354 ops/sec ±0.35% (93 runs sampled)
    WebAssembly x 140 ops/sec ±0.39% (79 runs sampled)
    N-API Addon x 3,529 ops/sec ±1.05% (87 runs sampled)
  Fastest is N-API Addon
AES decrypt for 512KB data:
    Pure JavaScript x 13.72 ops/sec ±2.73% (39 runs sampled)
    Node Crypto x 1,898 ops/sec ±0.35% (79 runs sampled)
    WebAssembly x 105 ops/sec ±0.38% (76 runs sampled)
    N-API Addon x 2,723 ops/sec ±0.47% (71 runs sampled)
  Fastest is N-API Addon
AES decrypt for 640KB data:
    Pure JavaScript x 11.43 ops/sec ±0.69% (32 runs sampled)
    Node Crypto x 1,608 ops/sec ±0.47% (91 runs sampled)
    WebAssembly x 84.38 ops/sec ±0.39% (72 runs sampled)
    N-API Addon x 2,066 ops/sec ±1.14% (94 runs sampled)
  Fastest is N-API Addon
AES decrypt for 768KB data:
    Pure JavaScript x 9.14 ops/sec ±1.20% (27 runs sampled)
    Node Crypto x 1,987 ops/sec ±1.13% (91 runs sampled)
    WebAssembly x 70.36 ops/sec ±0.52% (72 runs sampled)
    N-API Addon x 2,543 ops/sec ±1.22% (92 runs sampled)
  Fastest is N-API Addon
AES decrypt for 896KB data:
    Pure JavaScript x 8.06 ops/sec ±3.22% (25 runs sampled)
    Node Crypto x 1,419 ops/sec ±0.30% (95 runs sampled)
    WebAssembly x 60.02 ops/sec ±0.45% (62 runs sampled)
    N-API Addon x 2,294 ops/sec ±3.31% (88 runs sampled)
  Fastest is N-API Addon
AES decrypt for 1024KB data:
    Pure JavaScript x 7.07 ops/sec ±0.34% (22 runs sampled)
    Node Crypto x 2,197 ops/sec ±2.20% (94 runs sampled)
    WebAssembly x 53.18 ops/sec ±0.39% (68 runs sampled)
    N-API Addon x 1,867 ops/sec ±1.94% (87 runs sampled)
  Fastest is Node Crypto
✨  Done in 176.82s.
```

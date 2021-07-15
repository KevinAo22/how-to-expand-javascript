# How to expand JavaScript?

**Here is everything about improving JavaScript performance.**

## Native vs WebAssembly vs N-API Addon

Performance comparison of WebAssembly based on Rust, N-API Addon based on Rust, and native implementations in Node.js.

### AES128 Benchmark

```
CPU Arch: x64
CPU Info: Intel(R) Core(TM) i7-7820HQ CPU @ 2.90GHz
Memory Info: 16GB
Node version: v16.4.2
AES decrypt for 128KB data:
    Pure JavaScript x 56.16 ops/sec ±3.78% (60 runs sampled)
    Node Crypto x 8,040 ops/sec ±1.02% (87 runs sampled)
    WebAssembly x 435 ops/sec ±0.57% (91 runs sampled)
    N-API Addon x 9,833 ops/sec ±0.46% (95 runs sampled)
  Fastest is N-API Addon
AES decrypt for 256KB data:
    Pure JavaScript x 28.57 ops/sec ±3.48% (51 runs sampled)
    Node Crypto x 4,214 ops/sec ±1.77% (83 runs sampled)
    WebAssembly x 218 ops/sec ±0.48% (84 runs sampled)
    N-API Addon x 5,125 ops/sec ±0.46% (68 runs sampled)
  Fastest is N-API Addon
AES decrypt for 384KB data:
    Pure JavaScript x 18.50 ops/sec ±3.10% (35 runs sampled)
    Node Crypto x 2,986 ops/sec ±1.01% (90 runs sampled)
    WebAssembly x 146 ops/sec ±0.37% (82 runs sampled)
    N-API Addon x 3,494 ops/sec ±0.49% (92 runs sampled)
  Fastest is N-API Addon
AES decrypt for 512KB data:
    Pure JavaScript x 12.07 ops/sec ±5.23% (36 runs sampled)
    Node Crypto x 2,230 ops/sec ±1.54% (86 runs sampled)
    WebAssembly x 110 ops/sec ±0.36% (79 runs sampled)
    N-API Addon x 2,659 ops/sec ±0.98% (90 runs sampled)
  Fastest is N-API Addon
AES decrypt for 640KB data:
    Pure JavaScript x 10.19 ops/sec ±3.04% (30 runs sampled)
    Node Crypto x 1,866 ops/sec ±1.22% (87 runs sampled)
    WebAssembly x 88.10 ops/sec ±0.38% (75 runs sampled)
    N-API Addon x 2,149 ops/sec ±1.12% (68 runs sampled)
  Fastest is N-API Addon
AES decrypt for 768KB data:
    Pure JavaScript x 8.73 ops/sec ±1.22% (25 runs sampled)
    Node Crypto x 1,656 ops/sec ±1.51% (87 runs sampled)
    WebAssembly x 73.50 ops/sec ±0.42% (75 runs sampled)
    N-API Addon x 1,851 ops/sec ±0.97% (64 runs sampled)
  Fastest is N-API Addon
AES decrypt for 896KB data:
    Pure JavaScript x 7.33 ops/sec ±4.57% (23 runs sampled)
    Node Crypto x 1,520 ops/sec ±1.49% (86 runs sampled)
    WebAssembly x 62.75 ops/sec ±0.47% (65 runs sampled)
    N-API Addon x 1,635 ops/sec ±1.17% (86 runs sampled)
  Fastest is N-API Addon
AES decrypt for 1024KB data:
    Pure JavaScript x 6.29 ops/sec ±4.30% (20 runs sampled)
    Node Crypto x 1,300 ops/sec ±1.74% (85 runs sampled)
    WebAssembly x 55.10 ops/sec ±0.48% (70 runs sampled)
    N-API Addon x 1,513 ops/sec ±0.79% (76 runs sampled)
  Fastest is N-API Addon
```

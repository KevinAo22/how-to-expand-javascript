# How to expand JavaScript?

**Here is everything about improving JavaScript performance.**

## Native vs WebAssembly vs N-API Addon

Performance comparison of WebAssembly based on Rust, N-API Addon based on Rust, and native implementations in Node.js.

### AES128 Benchmark

```
AES decrypt for 1KB data:
    Native x 2,771 ops/sec ±1.45% (85 runs sampled)
    WebAssembly x 41,069 ops/sec ±1.84% (87 runs sampled)
    N-API Addon x 228,812 ops/sec ±5.90% (65 runs sampled)
  Fastest is N-API Addon
AES decrypt for 256KB data:
    Native x 33.33 ops/sec ±1.41% (58 runs sampled)
    WebAssembly x 187 ops/sec ±0.85% (79 runs sampled)
    N-API Addon x 3,296 ops/sec ±0.79% (90 runs sampled)
  Fastest is N-API Addon
AES decrypt for 1MB data:
    Native x 7.16 ops/sec ±2.55% (22 runs sampled)
    WebAssembly x 47.72 ops/sec ±0.84% (62 runs sampled)
    N-API Addon x 506 ops/sec ±29.48% (57 runs sampled)
  Fastest is N-API Addon
```

_Device Info_
cpu: 2.9 GHz 4-cores Intel Core i7
memory: 16 GB 2133 MHz LPDDR3

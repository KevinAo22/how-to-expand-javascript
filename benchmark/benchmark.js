const Benchmark = require('benchmark');
const os = require('os');
const nativeAES = require('../native/dist/aes');
const wasmAES = require('../wasm/build/nodejs/wasm');
const addonAES = require('../addon/addon.darwin-x64.node');

const randomInRange = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

const generateRandomUint8Array = (length) => {
  const uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i += 1) {
    uint8Array[i] = randomInRange(255);
  }
  return uint8Array;
};

const bytesToSize = (bytes) => {
  if (bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.min(parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10), sizes.length - 1);
    return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)}${sizes[i]}`;
  }
  return 'n/a';
};

const keyStr = '000102030405060708090a0b0c0d0e0f';
const ivStr = '101112131415161718191a1b1c1d1e1f';
const keyBuffer = Buffer.from(keyStr, 'hex');
const ivBuffer = Buffer.from(ivStr, 'hex');

console.log('CPU Arch:', os.arch());
console.log('CPU Info:', os.cpus()[0].model);
console.log(`Memory Info: ${Math.floor(os.totalmem() / 1024 / 1024 / 1024)}GB`);

for (let index = 0; index < 8; index += 1) {
  const dataSizeRatio = Math.max(1, index * 256);
  const source = generateRandomUint8Array(1024 * dataSizeRatio);
  const encrypted = addonAES.encryptInAes(source, keyBuffer, ivBuffer);
  const encryptedStr = Buffer.from(source).toString('base64');
  const decryptSuite = new Benchmark.Suite(`AES decrypt for ${bytesToSize(1024 * dataSizeRatio)} data: `);
  decryptSuite
    .add('Native JavaScript', () => {
      nativeAES.decryptInAes(encryptedStr, keyStr, ivStr);
    })
    .add('WebAssembly', () => {
      wasmAES.decrypt_in_aes(encrypted, keyBuffer, ivBuffer);
    })
    .add('N-API Addon', () => {
      addonAES.decryptInAes(encrypted, keyBuffer, ivBuffer);
    })
    .on('start', (event) => {
      console.log(event.currentTarget.name);
    })
    .on('cycle', (event) => {
      console.log(`    ${event.target}`);
    })
    .on('complete', (event) => {
      console.log(`  Fastest is ${event.currentTarget.filter('fastest').map('name')}`);
    });
  decryptSuite.run();
}

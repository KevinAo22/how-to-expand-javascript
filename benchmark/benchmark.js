const Benchmark = require('benchmark');
const os = require('os');
const nativeAES = require('../packages/native/dist/aes');
const wasmAES = require('../packages/wasm/build/wasm');
const addonAES = require('../packages/addon/addon.node');

const randomInRange = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

const generateRandomUint8Array = (length) => {
  const uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i += 1) {
    uint8Array[i] = randomInRange(255);
  }
  return uint8Array;
};

const keyStr = '000102030405060708090a0b0c0d0e0f';
const ivStr = '101112131415161718191a1b1c1d1e1f';
const keyBuffer = Buffer.from(keyStr, 'hex');
const ivBuffer = Buffer.from(ivStr, 'hex');

console.log('CPU Arch:', os.arch());
console.log('CPU Info:', os.cpus()[0].model);
console.log(`Memory Info: ${Math.floor(os.totalmem() / 1024 / 1024 / 1024)}GB`);
console.log('Node version:', process.version);

for (let index = 1; index <= 8; index += 1) {
  const dataSizeRatio = index * 128;
  const source = generateRandomUint8Array(1024 * dataSizeRatio);
  const encrypted = nativeAES.encryptInAesByNode(source, keyBuffer, ivBuffer);
  const encryptedStr = Buffer.from(source).toString('base64');

  const decryptSuite = new Benchmark.Suite(`AES decrypt for ${dataSizeRatio}KB data: `);
  decryptSuite
    .add('Pure JavaScript', () => {
      nativeAES.decryptInAesByJS(encryptedStr, keyStr, ivStr);
    })
    .add('Node Crypto', () => {
      nativeAES.decryptInAesByNode(encrypted, keyBuffer, ivBuffer);
    })
    .add('WebAssembly', () => {
      wasmAES.decrypt_in_aes_in_place(Buffer.from(encrypted), keyBuffer, ivBuffer);
    })
    .add('N-API Addon', () => {
      addonAES.decryptInAesInPlace(Buffer.from(encrypted), keyBuffer, ivBuffer);
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

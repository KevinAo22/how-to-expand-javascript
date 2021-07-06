const Benchmark = require('benchmark');
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

const keyStr = '000102030405060708090a0b0c0d0e0f';
const ivStr = '101112131415161718191a1b1c1d1e1f';
const keyBuffer = Buffer.from(keyStr, 'hex');
const ivBuffer = Buffer.from(ivStr, 'hex');

const smallSource = generateRandomUint8Array(1024);
const smallEncrypted = addonAES.encryptInAes(smallSource, keyBuffer, ivBuffer);
const smallEncryptedStr = Buffer.from(smallEncrypted).toString('base64');
const mediumSource = generateRandomUint8Array(256 * 1024);
const mediumEncrypted = addonAES.encryptInAes(mediumSource, keyBuffer, ivBuffer);
const mediumEncryptedStr = Buffer.from(mediumEncrypted).toString('base64');
const bigSource = generateRandomUint8Array(1024 * 1024);
const bigEncrypted = addonAES.encryptInAes(bigSource, keyBuffer, ivBuffer);
const bigEncryptedStr = Buffer.from(bigEncrypted).toString('base64');

const smallAesDecryptSuite = new Benchmark.Suite('AES decrypt for 1KB data: ');
smallAesDecryptSuite
  .add('Native', () => {
    nativeAES.decryptInAes(smallEncryptedStr, keyStr, ivStr);
  })
  .add('WebAssembly', () => {
    wasmAES.decrypt_in_aes(smallEncrypted, keyBuffer, ivBuffer);
  })
  .add('N-API Addon', () => {
    addonAES.decryptInAes(smallEncrypted, keyBuffer, ivBuffer);
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

const mediumAesDecryptSuite = new Benchmark.Suite('AES decrypt for 256KB data: ');
mediumAesDecryptSuite
  .add('Native', () => {
    nativeAES.decryptInAes(mediumEncryptedStr, keyStr, ivStr);
  })
  .add('WebAssembly', () => {
    wasmAES.decrypt_in_aes(mediumEncrypted, keyBuffer, ivBuffer);
  })
  .add('N-API Addon', () => {
    addonAES.decryptInAes(mediumEncrypted, keyBuffer, ivBuffer);
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

const bigAesDecryptSuite = new Benchmark.Suite('AES decrypt for 1MB data: ');
bigAesDecryptSuite
  .add('Native', () => {
    nativeAES.decryptInAes(bigEncryptedStr, keyStr, ivStr);
  })
  .add('WebAssembly', () => {
    wasmAES.decrypt_in_aes(bigEncrypted, keyBuffer, ivBuffer);
  })
  .add('N-API Addon', () => {
    addonAES.decryptInAes(bigEncrypted, keyBuffer, ivBuffer);
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

smallAesDecryptSuite.run();
mediumAesDecryptSuite.run();
bigAesDecryptSuite.run();

const Benchmark = require('benchmark');
const nativeAES = require('../dist/aes');
const wasmAES = require('../wasm/build/nodejs/wasm');

const randomInRange = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

const generateRandomUint8Array = (length) => {
  const uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i += 1) {
    uint8Array[i] = randomInRange(255);
  }
  return uint8Array;
};

const key = '000102030405060708090a0b0c0d0e0f';
const iv = '101112131415161718191a1b1c1d1e1f';
const keyBuffer = Buffer.from(key, 'hex');
const ivBuffer = Buffer.from(iv, 'hex');

const smallSource = Buffer.from(generateRandomUint8Array(1024)).toString('base64');
const smallEncrypted = nativeAES.encryptInAes(smallSource, key, iv);
const smallEncryptedBuffer = Buffer.from(smallEncrypted, 'base64');
const mediumSource = Buffer.from(generateRandomUint8Array(256 * 1024)).toString('base64');
const mediumEncrypted = nativeAES.encryptInAes(mediumSource, key, iv);
const mediumEncryptedBuffer = Buffer.from(mediumEncrypted, 'base64');
const bigSource = Buffer.from(generateRandomUint8Array(64 * 1024 * 1024)).toString('base64');
const bigEncrypted = nativeAES.encryptInAes(bigSource, key, iv);
const bigEncryptedBuffer = Buffer.from(bigEncrypted, 'base64');

const smallAesDecryptSuite = new Benchmark.Suite('AES decrypt for small data: ');
smallAesDecryptSuite
  .add('Native', () => {
    nativeAES.decryptInAes(smallEncrypted, key, iv);
  })
  .add('WASM', () => {
    wasmAES.decrypt_in_aes(smallEncryptedBuffer, keyBuffer, ivBuffer);
  })
  .on('start', (event) => {
    console.log(event.currentTarget.name);
  })
  .on('cycle', (event) => {
    console.log(`   ${String(event.target)}`);
  })
  .on('complete', (event) => {
    console.log(` Fastest is ${event.currentTarget.filter('fastest').map('name')}`);
  });

const mediumAesDecryptSuite = new Benchmark.Suite('AES decrypt for medium data: ');
mediumAesDecryptSuite
  .add('Native', () => {
    nativeAES.decryptInAes(mediumEncrypted, key, iv);
  })
  .add('WASM', () => {
    wasmAES.decrypt_in_aes(mediumEncryptedBuffer, keyBuffer, ivBuffer);
  })
  .on('start', (event) => {
    console.log(event.currentTarget.name);
  })
  .on('cycle', (event) => {
    console.log(`   ${String(event.target)}`);
  })
  .on('complete', (event) => {
    console.log(` Fastest is ${event.currentTarget.filter('fastest').map('name')}`);
  });

const bigAesDecryptSuite = new Benchmark.Suite('AES decrypt for big data: ');
bigAesDecryptSuite
  .add('Native', () => {
    nativeAES.decryptInAes(bigEncrypted, key, iv);
  })
  .add('WASM', () => {
    wasmAES.decrypt_in_aes(bigEncryptedBuffer, keyBuffer, ivBuffer);
  })
  .on('start', (event) => {
    console.log(event.currentTarget.name);
  })
  .on('cycle', (event) => {
    console.log(`   ${String(event.target)}`);
  })
  .on('complete', (event) => {
    console.log(` Fastest is ${event.currentTarget.filter('fastest').map('name')}`);
  });

smallAesDecryptSuite.run();
mediumAesDecryptSuite.run();
bigAesDecryptSuite.run();

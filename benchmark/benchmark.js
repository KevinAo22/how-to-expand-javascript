const Benchmark = require('benchmark');
const native = require('../dist/native');

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
const smallSource = Buffer.from(generateRandomUint8Array(1024)).toString('base64');
const smallEncrypted = native.encryptInAes(smallSource, key, iv);
const mediumSource = Buffer.from(generateRandomUint8Array(256 * 1024)).toString('base64');
const mediumEncrypted = native.encryptInAes(mediumSource, key, iv);
const bigSource = Buffer.from(generateRandomUint8Array(64 * 1024 * 1024)).toString('base64');
const bigEncrypted = native.encryptInAes(bigSource, key, iv);

const smallAesDecryptSuite = new Benchmark.Suite('AES decrypt for small data: ');
smallAesDecryptSuite
  .add('Native', () => {
    native.decryptInAes(smallEncrypted, key, iv);
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
    native.decryptInAes(mediumEncrypted, key, iv);
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
    native.decryptInAes(bigEncrypted, key, iv);
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

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
const source = Buffer.from(generateRandomUint8Array(1024)).toString('base64');
const encrypted = native.encryptInAes(source, key, iv);

const aesDecryptSuite = new Benchmark.Suite('AES decrypt: ');
aesDecryptSuite
  .add('Native', () => {
    native.decryptInAes(encrypted, key, iv);
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

aesDecryptSuite.run();

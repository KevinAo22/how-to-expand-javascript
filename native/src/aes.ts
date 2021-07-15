import { createCipheriv, createDecipheriv } from 'crypto';
import { AES, enc, mode, pad } from 'crypto-js';

export function encryptInAesByJS(source: string, keyStr: string, ivStr: string): string {
  const key = enc.Hex.parse(keyStr);
  const iv = enc.Hex.parse(ivStr);
  const encrypted = AES.encrypt(enc.Base64.parse(source), key, { iv, mode: mode.CBC, padding: pad.Pkcs7 });
  return encrypted.ciphertext.toString(enc.Base64);
}

export function decryptInAesByJS(source: string, keyStr: string, ivStr: string): string {
  const key = enc.Hex.parse(keyStr);
  const iv = enc.Hex.parse(ivStr);
  const decrypted = AES.decrypt(source, key, { iv, mode: mode.CBC, padding: pad.Pkcs7 });
  return decrypted.toString(enc.Base64);
}

export function encryptInAesByNode(source: Buffer, key: Buffer, iv: Buffer): Buffer {
  const cipher = createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(source);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted;
}

export function decryptInAesByNode(source: Buffer, key: Buffer, iv: Buffer): Buffer {
  const cipher = createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = cipher.update(source);
  decrypted = Buffer.concat([decrypted, cipher.final()]);
  return decrypted;
}

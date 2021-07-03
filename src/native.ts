import { AES, enc, mode, pad } from 'crypto-js';

export function encryptInAes(source: string, keyStr: string, ivString: string): string {
  const key = enc.Hex.parse(keyStr);
  const iv = enc.Hex.parse(ivString);
  const encrypted = AES.encrypt(enc.Base64.parse(source), key, { iv, mode: mode.CBC, padding: pad.Pkcs7 });
  return encrypted.ciphertext.toString(enc.Base64);
}

export function decryptInAes(source: string, keyStr: string, ivString: string): string {
  const key = enc.Hex.parse(keyStr);
  const iv = enc.Hex.parse(ivString);
  const decrypted = AES.decrypt(source, key, { iv, mode: mode.CBC, padding: pad.Pkcs7 });
  return decrypted.toString(enc.Base64);
}

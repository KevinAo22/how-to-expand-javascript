use aes::Aes128;
use block_modes::block_padding::Pkcs7;
use block_modes::{BlockMode, Cbc};
use wasm_bindgen::prelude::*;

type Aes128Cbc = Cbc<Aes128, Pkcs7>;

#[wasm_bindgen]
pub fn encrypt_in_aes(source: &[u8], key: &[u8], iv: &[u8]) -> Vec<u8> {
  let cipher = Aes128Cbc::new_from_slices(&key, &iv).unwrap();
  return cipher.encrypt_vec(source);
}

#[wasm_bindgen]
pub fn decrypt_in_aes(source: &[u8], key: &[u8], iv: &[u8]) -> Vec<u8> {
  let cipher = Aes128Cbc::new_from_slices(&key, &iv).unwrap();
  return cipher.decrypt_vec(source).unwrap();
}

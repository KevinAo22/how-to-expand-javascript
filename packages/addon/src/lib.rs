#[macro_use]
extern crate napi_derive;

use aes::Aes128;
use block_modes::block_padding::Pkcs7;
use block_modes::{BlockMode, Cbc};
use napi::{CallContext, JsBuffer, JsObject, JsUndefined, Result};

type Aes128Cbc = Cbc<Aes128, Pkcs7>;

#[module_exports]
fn init(mut exports: JsObject) -> Result<()> {
  exports.create_named_method("encryptInAes", encrypt_in_aes)?;
  exports.create_named_method("decryptInAes", decrypt_in_aes)?;
  exports.create_named_method("decryptInAesInPlace", decrypt_in_aes_in_place)?;
  Ok(())
}

#[js_function(3)]
fn encrypt_in_aes(ctx: CallContext) -> Result<JsBuffer> {
  let input = ctx.get::<JsBuffer>(0)?.into_value()?;
  let key = ctx.get::<JsBuffer>(1)?.into_value()?;
  let iv = ctx.get::<JsBuffer>(2)?.into_value()?;
  let cipher = Aes128Cbc::new_from_slices(&key, &iv).unwrap();
  let result = cipher.encrypt_vec(&input);
  return ctx
    .env
    .create_buffer_with_data(result)
    .map(|v| v.into_raw());
}

#[js_function(3)]
fn decrypt_in_aes(ctx: CallContext) -> Result<JsBuffer> {
  let input = ctx.get::<JsBuffer>(0)?.into_value()?;
  let key = ctx.get::<JsBuffer>(1)?.into_value()?;
  let iv = ctx.get::<JsBuffer>(2)?.into_value()?;
  let cipher = Aes128Cbc::new_from_slices(&key, &iv).unwrap();
  let result = cipher.decrypt_vec(&input).unwrap();
  return ctx
    .env
    .create_buffer_with_data(result)
    .map(|v| v.into_raw());
}

#[js_function(3)]
fn decrypt_in_aes_in_place(ctx: CallContext) -> Result<JsUndefined> {
  let input = &mut ctx.get::<JsBuffer>(0)?.into_value()?;
  let key = ctx.get::<JsBuffer>(1)?.into_value()?;
  let iv = ctx.get::<JsBuffer>(2)?.into_value()?;
  let cipher = Aes128Cbc::new_from_slices(&key, &iv).unwrap();
  cipher.decrypt(input).unwrap();
  return ctx.env.get_undefined();
}

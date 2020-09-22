mod utils;

use wasm_bindgen::prelude::*;
use wasm_remapper::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn remap(input: &[u8], reference: &[u8]) -> Result<Vec<u8>, JsValue> {
    Remapper::builder()
        .input(input)
        .reference(reference)
        .build()
        .map_err(|error| JsValue::from_str(&error.to_string()))?
        .remap()
        .map(|output| output.output)
        .map_err(|error| JsValue::from_str(&error.to_string()))
}

mod utils;

use wasm_bindgen::prelude::*;
use wasm_remapper::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[allow(non_snake_case)]
pub fn remap(
    input: &[u8],
    reference: &[u8],
    matchingThreshold: f32,
    ignoreDataSectionConstants: bool,
    requireExactFunctionLocals: bool,
) -> Result<Vec<u8>, JsValue> {
    Remapper::builder()
        .input(input)
        .reference(reference)
        .matching_threshold(matchingThreshold)
        .ingore_constant_data_section_pointers(ignoreDataSectionConstants)
        .require_exact_function_locals(requireExactFunctionLocals)
        .build()
        .map_err(|error| JsValue::from_str(&error.to_string()))?
        .remap()
        .map(|output| output.output)
        .map_err(|error| JsValue::from_str(&error.to_string()))
}

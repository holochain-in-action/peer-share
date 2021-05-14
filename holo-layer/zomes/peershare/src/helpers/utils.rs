use hdk::prelude::*;
pub fn err(reason: &str) -> WasmError {
    WasmError::Guest(String::from(reason))
}

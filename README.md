# wasm-remapper-web
A web app to help reverse engineer WebAssembly binaries.

## Demo
wasm-remapper-web is live at https://remapper.zebulon.dev/

## How it works
Wasm-remapper-web works by cross referencing every function inside the input WebAssembly binary with a **reference** WebAssembly binary with debug symbols. If you are able to determine the compiler version used to generate the input binary you can generally compile a binary that includes many functions from the standard library and generate a remapped output binary.

## As a library
wasm-remapper-web is built on top of my Rust library called [wasm_remapper](https://github.com/vlakreeh/wasm_remapper).

[![crates.io](https://img.shields.io/crates/v/wasm-remapper.svg)](https://crates.io/crates/wasm_remapper)
[![Documentation](https://docs.rs/wasm_remapper/badge.svg)](https://docs.rs/wasm_remapper/)

import React, { useState } from "react";
import Editor from "../editor/Editor";
import Sidebar from "../sidebar/Sidebar";
import "./App.css";

function readWasmFromLocalStorage(key: string): Uint8Array | undefined {
    const fromStorage = localStorage.getItem(key);

    if (fromStorage) {
        return new Uint8Array(Buffer.from(fromStorage, "base64"));
    }

    return undefined;
}

function App() {
    const [inputWasm, setInputWasm] = useState<Uint8Array | undefined>(readWasmFromLocalStorage("wasm.input"));
    const [referenceWasm, setReferenceWasm] = useState<Uint8Array | undefined>(readWasmFromLocalStorage("wasm.reference"));
    const createSaveHook = (setWasmFunc: (wasm: Uint8Array) => void, key: string): (arg0: Uint8Array) => void => {
        return (wasm) => {
            const base64String = Buffer.from(wasm).toString("base64");
            localStorage.setItem(key, base64String);
            setWasmFunc(wasm);
        };
    };

    return (<div id="app">
        <Sidebar wasm={{ inputWasm, referenceWasm }}/>
        <Editor type="input" setWasm={createSaveHook(setInputWasm, "wasm.input")}/>
        <Editor type="reference" setWasm={createSaveHook(setReferenceWasm, "wasm.reference")}/>
    </div>);
}

export default App;

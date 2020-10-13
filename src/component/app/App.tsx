import React, { createContext, useState } from "react";
import Editor from "../editor/Editor";
import Settings from "../settings/Settings";
import Sidebar from "../sidebar/Sidebar";
import "./App.css";

function readWasmFromLocalStorage(key: string): Uint8Array | undefined {
    const fromStorage = localStorage.getItem(key);

    if (fromStorage) {
        return new Uint8Array(Buffer.from(fromStorage, "base64"));
    }

    return undefined;
}

export type AppContextData = {
    inputWasm?: Uint8Array,
    referenceWasm?: Uint8Array,
    matchingThreshold: number,
    setMatchingThreshold?: (x: number) => void,
    ignoreDataSectionConstants: boolean,
    requireExactFunctionLocals: boolean,
    setIgnoreDataSectionConstants?: (value: boolean) => void,
    setRequireExactFunctionLocals?: (value: boolean) => void,
};

export const AppContext = createContext<AppContextData>({
    matchingThreshold: 0.9,
    ignoreDataSectionConstants: false,
    requireExactFunctionLocals: true
});

const createSaveHook = (setWasmFunc: (wasm: Uint8Array) => void, key: string): (arg0: Uint8Array) => void => {
    return (wasm) => {
        const base64String = Buffer.from(wasm).toString("base64");
        localStorage.setItem(key, base64String);
        setWasmFunc(wasm);
    };
};

function App() {
    const [inputWasm, setInputWasm] = useState<Uint8Array | undefined>(readWasmFromLocalStorage("wasm.input"));
    const [referenceWasm, setReferenceWasm] = useState<Uint8Array | undefined>(readWasmFromLocalStorage("wasm.reference"));

    const [matchingThreshold, setMatchingThreshold] = useState(0.9);
    const [ignoreDataSectionConstants, setIgnoreDataSectionConstants] = useState(false);
    const [requireExactFunctionLocals, setRequireExactFunctionLocals] = useState(true);

    const [opened, setOpened] = useState(false);

    const providerValue = {
        referenceWasm,
        inputWasm,
        matchingThreshold,
        setMatchingThreshold,
        ignoreDataSectionConstants,
        requireExactFunctionLocals,
        setIgnoreDataSectionConstants,
        setRequireExactFunctionLocals,  
    };

    return (
        <AppContext.Provider value={providerValue}>
            <Settings opened={opened} closeSettings={() => setOpened(false)}></Settings>
            <div id="app">
                <Sidebar openSettings={() => setOpened(true)}/>
                <Editor type="input" setWasm={createSaveHook(setInputWasm, "wasm.input")}/>
                <Editor type="reference" setWasm={createSaveHook(setReferenceWasm, "wasm.reference")}/>
            </div>
        </AppContext.Provider>
    );
}

export default App;

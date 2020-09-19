import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import monaco from "monaco-editor";
import { useDropzone } from "react-dropzone";

// Global editor options
const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    fontFamily: "JetBrains Mono",
    readOnly: true,
    minimap: {
        renderCharacters: false
    }
};

export type EditorProps = {
    type: "input" | "reference"
};

export default function Editor(props: EditorProps) {
    const { type } = props;
    const [code, setCode] = useState(`;; Drop the ${type} wasm here`)

    const onDrop = async ([wasmBlob]: Blob[]) => {
        const { wasm2wat } = await import("wasm2wat");
        const buffer = await wasmBlob.arrayBuffer();
        const wat = wasm2wat(new Uint8Array(buffer));
        setCode(wat);
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true });

    return (<div style={{ width: "100%" }} {...getRootProps()}>
        <input {...getInputProps()} />
        <MonacoEditor value={code} theme="vs-dark-wat" options={options} language="wat" />
    </div>);
}
import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import monaco from "monaco-editor";

// Global editor options
const options: monaco.editor.IStandaloneEditorConstructionOptions = {
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
    const [code] = useState(`;; Drop the ${type} wasm here`);
    return (<MonacoEditor value={code} theme="vs-dark-wat" options={options} language="wat"/>);
}
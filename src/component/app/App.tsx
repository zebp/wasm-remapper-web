import React from "react";
import Editor from "../editor/Editor";
import "./App.css";

function App() {
    return (<div id="app">
        <Editor type="input" />
        <Editor type="reference" />
    </div>);
}

export default App;

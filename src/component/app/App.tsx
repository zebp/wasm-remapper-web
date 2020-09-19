import React from "react";
import Editor from "../editor/Editor";
import Sidebar from "../sidebar/Sidebar";
import "./App.css";

function App() {
    return (<div id="app">
        <Sidebar />
        <Editor type="input" />
        <Editor type="reference" />
    </div>);
}

export default App;

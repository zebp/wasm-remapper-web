import React from "react";
import ReactDOM from "react-dom";
import App from "./component/app/App";
import { register } from "./language";
import "./index.css";

register();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

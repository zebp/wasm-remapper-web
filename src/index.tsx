import React from "react";
import ReactDOM from "react-dom";
import App from "./component/app/App";
import { register } from "./language";
import "./index.css";

register();

function Root() {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

ReactDOM.render(
    <Root />,
    document.getElementById("root")
);

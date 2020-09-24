import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./component/app/App";
import { register } from "./language";
import "./index.css";
import Settings from "./component/settings/Settings";

register();

function Root() {
    const [opened, setOpened] = useState(false);

    return (
        <React.StrictMode>
            <Settings opened={opened} closeSettings={() => setOpened(false)}></Settings>
            <App openSettings={() => setOpened(true)}/>
        </React.StrictMode>
    );
}

ReactDOM.render(
    <Root />,
    document.getElementById("root")
);

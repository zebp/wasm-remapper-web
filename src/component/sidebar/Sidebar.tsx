import React from "react";
import SidebarIcon from "./SidebarIcon";
import ReactTooltip from "react-tooltip";
import "./Sidebar.css"

export default function Sidebar() {
    return (<div id="sidebar">
        <SidebarIcon src="code-download-outline" dataFor="remap" />
        <ReactTooltip id="remap" effect="solid" place="right" backgroundColor="#313131" delayShow={400}>
            <span> Remap the input binary and download the result </span>
        </ReactTooltip>
        <SidebarIcon src="settings-2-outline" dataFor="settings" />
        <ReactTooltip id="settings" effect="solid" place="right" backgroundColor="#313131" delayShow={400}>
            <span> Configure the remapper </span>
        </ReactTooltip>
        <SidebarIcon src="save-outline" dataFor="save" />
        <ReactTooltip id="save" effect="solid" place="right" backgroundColor="#313131" delayShow={400}>
            <span> Save the current input and reference binaries to local storage </span>
        </ReactTooltip>
    </div>);
}
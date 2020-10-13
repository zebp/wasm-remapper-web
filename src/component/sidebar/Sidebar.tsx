import React, { useContext } from "react";
import SidebarIcon from "./SidebarIcon";
import ReactTooltip from "react-tooltip";
import { saveAs } from "file-saver";
import "./Sidebar.css"
import { AppContext } from "../app/App";

export type SidebarProps = {
    openSettings: () => void,
};

export default function Sidebar(props: SidebarProps) {
    const { inputWasm, referenceWasm, matchingThreshold, ignoreDataSectionConstants, requireExactFunctionLocals } = useContext(AppContext);

    const remapClickHandler = async () => {
        const { remap } = await import("wasm-remapper");

        if (!inputWasm) {
            alert("Missing input binary");
            return;
        }

        if (!referenceWasm) {
            alert("Missing input binary");
            return;
        }

        const outputWasm = remap(
            inputWasm,
            referenceWasm,
            matchingThreshold,
            ignoreDataSectionConstants,
            requireExactFunctionLocals
        );
        const outputBlob = new Blob([outputWasm], { type: "application/wasm" });
        saveAs(outputBlob, "output.wasm");
    };

    return (<div id="sidebar">
        <SidebarIcon src="code-download-outline" dataFor="remap" onClick={remapClickHandler} />
        <ReactTooltip id="remap" effect="solid" place="right" backgroundColor="#313131" delayShow={400}>
            <span> Remap the input binary and download the result </span>
        </ReactTooltip>
        <SidebarIcon src="settings-2-outline" dataFor="settings" onClick={props.openSettings} />
        <ReactTooltip id="settings" effect="solid" place="right" backgroundColor="#313131" delayShow={400}>
            <span> Configure the remapper </span>
        </ReactTooltip>
        <SidebarIcon src="github-outline" dataFor="github" onClick={() => {
            (window.location as any) = "https://github.com/vlakreeh/wasm-remapper-web";
        }} />
        <ReactTooltip id="github" effect="solid" place="right" backgroundColor="#313131" delayShow={400}>
            <span> Visit wasm-remapper's GitHub repo </span>
        </ReactTooltip>
    </div>);
}
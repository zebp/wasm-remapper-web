import React from "react";
import SidebarIcon from "./SidebarIcon";
import ReactTooltip from "react-tooltip";
import { saveAs } from "file-saver";
import "./Sidebar.css"

export type SidebarProps = {
    wasm: {
        inputWasm?: Uint8Array,
        referenceWasm?: Uint8Array
    },
    openSettings: () => void,
};

export default function Sidebar(props: SidebarProps) {
    const remapClickHandler = async () => {
        const { remap } = await import("wasm-remapper");
        const { inputWasm, referenceWasm } = props.wasm;

        if (!inputWasm) {
            alert("Missing input binary");
            return;
        }

        if (!referenceWasm) {
            alert("Missing input binary");
            return;
        }

        const outputWasm = remap(inputWasm, referenceWasm);
        const outputBlob = new Blob([outputWasm], { type: "application/wasm" });
        saveAs(outputBlob, "output.wasm");
    };

    return (<div id="sidebar">
        <SidebarIcon src="code-download-outline" dataFor="remap" onClick={remapClickHandler}/>
        <ReactTooltip id="remap" effect="solid" place="right" backgroundColor="#313131" delayShow={400}>
            <span> Remap the input binary and download the result </span>
        </ReactTooltip>
        <SidebarIcon src="settings-2-outline" dataFor="settings" onClick={props.openSettings}/>
        <ReactTooltip id="settings" effect="solid" place="right" backgroundColor="#313131" delayShow={400}>
            <span> Configure the remapper </span>
        </ReactTooltip>
        <SidebarIcon src="github-outline" dataFor="github" onClick={() => {
            (window.location as any) = "https://github.com/vlakreeh/";
        }}/>
        <ReactTooltip id="github" effect="solid" place="right" backgroundColor="#313131" delayShow={400}>
            <span> Visit wasm-remapper's GitHub repo </span>
        </ReactTooltip>
    </div>);
}
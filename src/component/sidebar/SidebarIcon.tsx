import React, { useEffect } from "react";
import "./SidebarIcon.css";

const eva = require("eva-icons");

export type SidebarIconProps = {
    src: string,
    alt?: string,
    dataFor?: string,
    onClick?: () => void,
};

export default function SidebarIcon({ src, alt, dataFor, onClick }: SidebarIconProps) {
    useEffect(() => eva.replace(), []);
    return (<div onClick={onClick} data-tip="" data-for={dataFor} className="sidebarIcon">
        <img data-eva={src} alt={alt} />
    </div>);
}
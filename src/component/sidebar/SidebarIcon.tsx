import React from "react";
import "./SidebarIcon.css";

export type SidebarIconProps = {
    src: string,
    alt?: string,
    onClick: () => void,
};

export default function SidebarIcon({ src, alt, onClick }: SidebarIconProps) {
    return (<div onClick={onClick} className="sidebarIcon">
        <img src={src} alt={alt}/>
    </div>);
}
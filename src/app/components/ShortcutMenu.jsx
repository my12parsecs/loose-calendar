"use client"

import "../stylesheets/shortcut-menu.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function ShortcutMenu({which}) {
    const [isOpen, setIsOpen] = useState(true);
    
    return (
        <div className="shortcut-menu-container">
            <div style={isOpen ? {display: "none"} : {display: "flex"}} className="shortcut-open" onClick={() => {setIsOpen(true);}}>
                <FontAwesomeIcon icon={faKeyboard} className="shortcut-icon" />
            </div>
            <div className={`shortcut-menu`} style={isOpen ? {display: "block"} : {display: "none"}}>
                <div className="shortcut-close" onClick={() => {setIsOpen(false);}}>
                    <FontAwesomeIcon icon={faXmark} className="shortcut-icon" />
                </div>
                <div className="shortcut-title">Hotkeys</div>
                {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">B</div><div className="shortcut-colon">:</div><div className="shortcut-action">Back to Home</div></div>: null}
                {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">K</div><div className="shortcut-colon">:</div><div className="shortcut-action">Next Day</div></div>: null}
                {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">J</div><div className="shortcut-colon">:</div><div className="shortcut-action">Previous Day</div></div>: null}
                {/* {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">L</div><div className="shortcut-colon">:</div><div className="shortcut-action">Next Week</div></div>: null} */}
                {/* {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">H</div><div className="shortcut-colon">:</div><div className="shortcut-action">Previous Week</div></div>: null} */}
                <div className="shortcut-item"><div className="shortcut-key">L</div><div className="shortcut-colon">:</div><div className="shortcut-action">Next Week</div></div>
                <div className="shortcut-item"><div className="shortcut-key">H</div><div className="shortcut-colon">:</div><div className="shortcut-action">Previous Week</div></div>
                {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">I</div><div className="shortcut-colon">:</div><div className="shortcut-action">Focus</div></div>: null}
                {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">Esc</div><div className="shortcut-colon">:</div><div className="shortcut-action">Unfocus</div></div>: null}
            </div> 
        </div>
    )
}
"use client"

import "../stylesheets/shortcut-menu.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ShortcutMenu({which}) {
    const [isClosed, setIsClosed] = useState(null);

    useEffect(()=>{
        const storedValue = localStorage.getItem("shortcut-menu");
        // Only update state if localStorage contains a value
        setIsClosed(storedValue === "true");
    }, [])

      // Don't render until we've checked localStorage
    if (isClosed === null) {
        return null;
      }
    
    return (
        <div className="shortcut-menu-container">
            <div style={isClosed ? {display: "flex"} : {display: "none"}} className="shortcut-open" onClick={() => {setIsClosed(false); localStorage.setItem("shortcut-menu", false)}}>
                <FontAwesomeIcon icon={faKeyboard} className="shortcut-icon" />
            </div>
            <div className={`shortcut-menu`} style={isClosed ? {display: "none"} : {display: "block"}}>
                <div className="shortcut-close" onClick={() => {
                    setIsClosed(true);
                    localStorage.setItem("shortcut-menu", true)
                    }}>
                    <FontAwesomeIcon icon={faXmark} className="shortcut-icon" />
                </div>
                <Link href={"/hotkeys"} className="shortcut-title">Hotkeys</Link>
                {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">B</div><div className="shortcut-colon">:</div><div className="shortcut-action">Back to Home</div></div>: null}
                {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">L</div><div className="shortcut-colon">:</div><div className="shortcut-action">Next Day</div></div>: null}
                {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">H</div><div className="shortcut-colon">:</div><div className="shortcut-action">Previous Day</div></div>: null}
                {/* {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">L</div><div className="shortcut-colon">:</div><div className="shortcut-action">Next Week</div></div>: null} */}
                {/* {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">H</div><div className="shortcut-colon">:</div><div className="shortcut-action">Previous Week</div></div>: null} */}
                <div className="shortcut-item"><div className="shortcut-key">K</div><div className="shortcut-colon">:</div><div className="shortcut-action">Next Week</div></div>
                <div className="shortcut-item"><div className="shortcut-key">J</div><div className="shortcut-colon">:</div><div className="shortcut-action">Previous Week</div></div>
                {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">I</div><div className="shortcut-colon">:</div><div className="shortcut-action">Focus</div></div>: null}
                {which === "slug" ? <div className="shortcut-item"><div className="shortcut-key">Esc</div><div className="shortcut-colon">:</div><div className="shortcut-action">Unfocus</div></div>: null}
            </div> 
        </div>
    )
}
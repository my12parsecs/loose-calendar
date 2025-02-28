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
        setIsClosed(storedValue === null ? true : storedValue === "true");
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
                <Link href="/hotkeys" className="shortcut-title">Hotkeys</Link>
                <div className="shortcut-item"><div className="shortcut-key">B</div><div className="shortcut-colon">:</div><div className="shortcut-action">Back</div></div>
                <div className="shortcut-item"><div className="shortcut-key">P</div><div className="shortcut-colon">:</div><div className="shortcut-action">Go to Present</div></div>
                {which !== "slug" ? <div className="shortcut-item"><div className="shortcut-key">SU</div><div className="shortcut-colon">:</div><div className="shortcut-action">Sunday</div></div>: null}
                {which !== "slug" ? <div className="shortcut-item"><div className="shortcut-key">M</div><div className="shortcut-colon">:</div><div className="shortcut-action">Monday</div></div>: null}
                {which !== "slug" ? <div className="shortcut-item"><div className="shortcut-key">TU</div><div className="shortcut-colon">:</div><div className="shortcut-action">Tuesday</div></div>: null}
                {which !== "slug" ? <div className="shortcut-item"><div className="shortcut-key">W</div><div className="shortcut-colon">:</div><div className="shortcut-action">Wednesday</div></div>: null}
                {which !== "slug" ? <div className="shortcut-item"><div className="shortcut-key">TH</div><div className="shortcut-colon">:</div><div className="shortcut-action">Thursday</div></div>: null}
                {which !== "slug" ? <div className="shortcut-item"><div className="shortcut-key">F</div><div className="shortcut-colon">:</div><div className="shortcut-action">Friday</div></div>: null}
                {which !== "slug" ? <div className="shortcut-item"><div className="shortcut-key">SA</div><div className="shortcut-colon">:</div><div className="shortcut-action">Saturday</div></div>: null}

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
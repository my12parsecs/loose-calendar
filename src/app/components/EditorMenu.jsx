"use client"

import "../stylesheets/editor-menu.css";
import "../stylesheets/page.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faKeyboard, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ShortcutMenu({which}) {
    const [isClosed, setIsClosed] = useState(null);

    useEffect(()=>{
        const storedValue = localStorage.getItem("editor-menu");
        // Only update state if localStorage contains a value
        setIsClosed(storedValue === "true");
    }, [])

      // Don't render until we've checked localStorage
    if (isClosed === null) {
        return null;
      }
    
    return (
        <div className="editor-menu-container">
            {isClosed && (
                <div className="editor-menu-tab" onClick={() => {setIsClosed(false); localStorage.setItem("editor-menu", false)}}>
                    <FontAwesomeIcon icon={faChevronLeft} className="editor-menu-open-icon" />
                </div>
            )}
            {!isClosed && (
                <div className="editor-menu" onClick={() => {setIsClosed(true); localStorage.setItem("editor-menu", true)}}>
                    <div className="editor-menu-content">
                        <div className="editor-menu-row"><span className="syntax">##</span> Heading</div>
                        <div className="editor-menu-row"><span className="syntax">###</span> Subheading</div>
                        <div className="editor-menu-row"><span className="syntax">-</span> List</div>
                        <div className="editor-menu-row"><span className="syntax">1.</span> Numbered List</div>
                        <div className="editor-menu-row"><span className="syntax">---</span> Line</div>

                        <div className="editor-menu-row"><span className="syntax">@13-15</span> <span className="time-tag">@13:00~15:00</span></div>
                        <div className="editor-menu-row"><span className="syntax">@7.3-14.2</span> <span className="time-tag">@7:30~14:20</span></div>
                        <div className="editor-menu-row"><span className="syntax">@7.3-</span> <span className="time-tag">@7:30~</span></div>
                        <Link href={"/editor"} className="editor-menu-link">More about time stamps</Link>
                    </div>
                </div>
            ) }
        </div>
    )
}
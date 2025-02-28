"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton() {
    return (
        <div onClick={()=>{window.history.back()}} className="back-button">
            <FontAwesomeIcon icon={faChevronLeft} className="back-button-icon" />
        </div>
    )
}
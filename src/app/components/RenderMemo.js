"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

import { generateHTML } from '@tiptap/core'
import StarterKit from "@tiptap/starter-kit";

import DOMPurify from "dompurify";

export default function RenderMemo({certainDate}) {

    const [dayMemo, setDayMemo] = useState("");

    useEffect(()=>{
        const localStorageContent = JSON.parse(localStorage.getItem(`looseCal-${certainDate}`))

        if(localStorageContent && localStorageContent.content){
            const generatedHTML = generateHTML(localStorageContent, [StarterKit]);
            const sanitizedHTML = DOMPurify.sanitize(generatedHTML);
            setDayMemo(sanitizedHTML);
            // console.log(sanitizedHTML);
        }

    }, [certainDate])


    return (
        <div className="day-right">
            <div className="day-right-inner" dangerouslySetInnerHTML={{ __html: dayMemo }}></div>
        </div>
    )
}
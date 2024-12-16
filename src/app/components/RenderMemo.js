"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

import { generateHTML } from '@tiptap/core'

import StarterKit from "@tiptap/starter-kit";

export default function RenderMemo({certainDate}) {

    const [dayMemo, setDayMemo] = useState("");

    useEffect(()=>{
        const localStorageContent = JSON.parse(localStorage.getItem(`looseCal-${certainDate}`))

        if(localStorageContent && localStorageContent.content){
            setDayMemo(generateHTML(localStorageContent.content[0], [StarterKit]));
        }

    }, [])


    return (
        <div className="day-right">
            {dayMemo}
        </div>
    )
}
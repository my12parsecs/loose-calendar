// "use client"

// import { useEffect, useState } from "react";
// import Image from "next/image";

// import { generateHTML } from '@tiptap/core'
// import StarterKit from "@tiptap/starter-kit";

// import DOMPurify from "dompurify";
// import { getPost } from "../_actions/actions";

// export default function RenderMemo({certainDate}) {

//     const [dayMemo, setDayMemo] = useState("");

//     useEffect(()=>{
//         // const localStorageContent = JSON.parse(localStorage.getItem(`looseCal-${certainDate}`))
//         const localStorageContent = getPost(certainDate)

//         if(localStorageContent && localStorageContent.content){
//             const generatedHTML = generateHTML(localStorageContent, [StarterKit]);
//             const sanitizedHTML = DOMPurify.sanitize(generatedHTML);
//             setDayMemo(sanitizedHTML);
//         }

//     }, [certainDate])


//     return (
//         <div className="day-right">
//             <div className="day-right-inner" dangerouslySetInnerHTML={{ __html: dayMemo }}></div>
//         </div>
//     )
// }






"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

import { generateHTML } from '@tiptap/core'
import StarterKit from "@tiptap/starter-kit";

import DOMPurify from "dompurify";
import { getPost } from "../_actions/actions";

export default function RenderMemo({certainDate}) {

    const [dayMemo, setDayMemo] = useState("");

    useEffect(() => {
        async function fetchMemo() {
          try {
            const res = await fetch(`/api/getPost?date=${certainDate}`);
            const data = await res.json();            
            if (data.content) {
              const generatedHTML = generateHTML(JSON.parse(data.content), [StarterKit]);
              const sanitizedHTML = DOMPurify.sanitize(generatedHTML);
              setDayMemo(sanitizedHTML);
            }
          } catch (error) {
            console.error("Error fetching memo:", error);
          }
        }
        fetchMemo();
      }, [certainDate]);
      


    return (
        <div className="day-right">
            <div className="day-right-inner" dangerouslySetInnerHTML={{ __html: dayMemo }}></div>
        </div>
    )
}
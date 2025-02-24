"use client"

import { useEffect, useState } from 'react';

export default function RenderDate({clientWeek, index}){

    const thisWeek = clientWeek().thisWeek
    const [date, setDate] = useState("");

    useEffect(()=>{
        setDate(thisWeek?.[index]?.date?.slice(8, 10))
    }, [thisWeek])
    
    return(date)
}
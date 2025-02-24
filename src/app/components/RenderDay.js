"use client"

import { useEffect, useState } from 'react';

export default function RenderDay({clientWeek, index}){

    const thisWeek = clientWeek().thisWeek
    const [day, setDay] = useState("");

    useEffect(()=>{
        setDay(thisWeek[index]?.day)
    }, [thisWeek])
  
    return(day)
}
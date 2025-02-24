"use client"

import ClientToday from './ClientToday';


export default function RenderLeft({ClientWeek, which, number, index}){
    
    const thisWeek = ClientWeek(which, number).thisWeek
    let isToday = false

    if(ClientToday().today.slice(0, 10) === thisWeek?.[index]?.date?.slice(0, 10)){
        isToday = true
    }

    return (
        <div className={`day-left ${isToday ? "day-left-today" : ""}`} key={index}>
            <div className="day-left-date">{thisWeek?.[index]?.date?.slice(8, 10)}</div>
            <div className="day-left-day">{thisWeek[index]?.day}</div>
        </div>
    )
}
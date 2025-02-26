"use client";

import { useEffect, useState } from "react";
import ClientToday from "./ClientToday";

export default function RenderLeft({ ClientWeek, which, number, index }) {
  // Use a client-side only approach for date formatting
  const [mounted, setMounted] = useState(false);

  // Initialize with empty values to prevent hydration mismatch
  const [thisWeek, setThisWeek] = useState([]);
  const [day, setDay] = useState("");
  const [isToday, setIsToday] = useState(false);

  // Only run this after component mounts on client
  useEffect(() => {
    const weekData = ClientWeek(which, number).thisWeek;
    setThisWeek(weekData);
    setDay(weekData[index]?.day);

    // Check if today
    const today = ClientToday().today.slice(0, 10);
    setIsToday(today === weekData[index]?.date?.slice(0, 10));

    // Mark as mounted to enable client-side rendering
    setMounted(true);
  }, [ClientWeek, which, number, index]);

  // Return a skeleton or nothing during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`day-left`} key={index}>
        <div className="day-left-date"></div>
        <div className="day-left-day"></div>
      </div>
    );
  }

  // Only render the actual content client-side after mounting
  return (
    <div className={`day-left ${isToday ? "day-left-today" : ""}`} key={index}>
      <div className="day-left-date">
        {/* <span>{thisWeek[index]?.date?.slice(5, 7)}/</span> */}
        {thisWeek[index]?.date?.slice(8, 10)}</div>
      <div className="day-left-day">{day}</div>
    </div>
  );
}

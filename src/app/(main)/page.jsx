'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'

import jstz from 'jstimezonedetect';
import getUserLocale from 'get-user-locale';
import dayjs from 'dayjs';

import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from '@tiptap/core'

import "../stylesheets/page.css";
import Tiptap from "../components/Tiptap";
import RenderMemo from "../components/RenderMemo";


export default function Home() {
  const router = useRouter()

  // const [isOpen, setIsOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  let userTimezone = ""
  let userLanguage = ""

  const [thisWeekToday, setThisWeekToday] = useState("")
  let thisWeekSunday = ""

  const [thisWeek, setThisWeek] = useState([])

  const [storageValid, setStorageValid] = useState([])

  useEffect(()=>{

    // ユーザーのタイムゾーンを取得 Asia/Tokyoとか
    var tz = jstz.determine();
    userTimezone = tz.name();

    // ユーザーのLocaleを取得 自分の場合はen-USだった
    const userLocale = getUserLocale();
    userLanguage = userLocale.slice(0, 2);

    var utc = require("dayjs/plugin/utc");
    var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
    require(`dayjs/locale/${userLanguage}`);
    dayjs.locale(userLanguage);
    dayjs.extend(utc)
    dayjs.extend(timezone)
    // console.log(dayjs().tz(userTimezone).format());
    // 1日後の日付を取得
    // console.log(dayjs().tz(userTimezone).add(1, 'day').format());
    // 1日前の日付を取得
    // console.log(dayjs().tz(userTimezone).subtract(1, 'day').format());
    // 曜日を取得
    // console.log(dayjs().tz(userTimezone).format("ddd"));


    // console.log(dayjs().tz(userTimezone).format("d"));
    setThisWeekToday(dayjs().tz(userTimezone).format().slice(0, 10))
    thisWeekSunday = dayjs().tz(userTimezone).startOf('week').format();
    // console.log("userTimezone", userTimezone);
    // console.log("dayjs()", dayjs());
    // console.log("thisWeekToday", thisWeekToday);
    
    const weekData = [];
    for (let i = 0; i < 7; i++) {
      weekData.push({
        date: dayjs().tz(userTimezone).startOf("week").add(i, "day").format(),
        day: dayjs().tz(userTimezone).startOf("week").add(i, "day").format("ddd"),
      });
    }
    setThisWeek(weekData);

    let tempStorageValid = []
    weekData.map(day => {
      tempStorageValid.push(day.date.slice(0, 10))
    })
    setStorageValid(tempStorageValid)
    
  
    selectedDate && window.history.replaceState({ selectedDate }, "", "/");
  }, [])


  useEffect(() => {
    !selectedDate && window.history.pushState({ selectedDate }, "", "/");
  }, [selectedDate])



  function cleanLooseCalKeys() {
    // Regular expression to match keys like "looseCal-XX-YY" (e.g., "looseCal-12-17")
    const keyPattern = /^looseCal-\d{4}-\d{2}-\d{2}$/;
  
    // Loop through all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
  
      // Check if the key matches the "looseCal-XX-YY" format
      if (keyPattern.test(key)) {
        // Extract the date part (e.g., "12-17")
        const datePart = key.split("looseCal-")[1];
  
        // If the date is NOT in the validDates array, remove it
        if (!storageValid.includes(datePart)) {
          localStorage.removeItem(key);
          console.log(`Removed: ${key}`);
        }
      }
    }
  }

  useEffect(() => {
    if(storageValid.length === 7){
      cleanLooseCalKeys()
    }
  }, [storageValid])




  return (
    <div className="main">
      {/* {console.log(storageValid)} */}

    {!selectedDate ? (
      thisWeek.map(day => {

        let isToday = day.date.slice(0, 10) === thisWeekToday;

        let routeMonth = day.date.slice(5, 7);
        let routeDay = day.date.slice(8, 10);

        return (
          <div key={day.date} className="day"
          onClick={() => {
            setSelectedDate(day.date.slice(0, 10))
            setSelectedDay(day.day)
            window.history.pushState({selectedDate}, '', `/${routeMonth}${routeDay}`)
            }}
          // onClick={() => router.push(`/${routeMonth}${routeDay}`, {shallow: true})}
          >
            <div className={`day-left ${isToday ? "day-left-today" : ""}`}>
              <div className="day-left-date">{day.date.slice(8, 10)}</div>
              <div className="day-left-day">{day.day}</div>
            </div>
            <RenderMemo certainDate={day.date.slice(0, 10)} />
          </div>
        );
      })
    ) : (
      <Tiptap selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedDay={selectedDay} isToday={selectedDate === thisWeekToday} />
    )}

    </div>
  );
}

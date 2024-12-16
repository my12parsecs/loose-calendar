'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'

import jstz from 'jstimezonedetect';
import getUserLocale from 'get-user-locale';
import dayjs from 'dayjs';

import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from '@tiptap/core'

import "./stylesheets/page.css";
import Tiptap from "./components/Tiptap";
import RenderMemo from "./components/RenderMemo";


export default function Home() {
  const router = useRouter()


  // ユーザーのタイムゾーンを取得 Asia/Tokyoとか
  var tz = jstz.determine();
  const userTimezone = tz.name();
  // console.log(userTimezone);

  // ユーザーのLocaleを取得 光の場合はen-USだった
  const userLocale = getUserLocale();
  // console.log(userLocale);
  const userLanguage = userLocale.slice(0, 2);
  // const userLanguage = "ja"
  // console.log(userLanguage);
  

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
  const thisWeekToday = dayjs().tz(userTimezone).format().slice(0, 10);
  const thisWeekSunday = dayjs().tz(userTimezone).startOf('week').format();
  // console.log(thisWeekSunday);
  
  let thisWeek = []
  for (let i = 0; i < 7; i++) {
    thisWeek.push({
      date: dayjs().tz(userTimezone).startOf('week').add(i, 'day').format(),
      day: dayjs().tz(userTimezone).startOf('week').add(i, 'day').format("ddd"),
    });
  }
  // console.log(thisWeek);


  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  console.log("selectedDate", selectedDate);
  

  return (
    <div className="main">

    {/* {!selectedDate ? ( */}
      {thisWeek.map(day => {
        console.log(day.date.slice(0, 10), thisWeekToday);

        let isToday = day.date.slice(0, 10) === thisWeekToday;

        let routeMonth = day.date.slice(5, 7);
        let routeDay = day.date.slice(8, 10);

        return (
          <div key={day.date} className="day"
          // onClick={() => {
          //   setSelectedDate(day.date.slice(0, 10))
          //   setSelectedDay(day.day)
          //   }}
          onClick={() => router.push(`/${routeMonth}${routeDay}`)}
          >
            <div className={`day-left ${isToday ? "day-left-today" : ""}`}>
              <div className="day-left-date">{day.date.slice(8, 10)}</div>
              <div className="day-left-day">{day.day}</div>
            </div>
            <RenderMemo certainDate={day.date.slice(5, 10)} />
          </div>
        );
      })
      }
    {/* ) : (
      <Tiptap selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedDay={selectedDay} />
    )} */}

 
      {/* {thisWeek.map(day => {

        console.log(day.date.slice(0, 10), thisWeekToday);
        
        let isToday = day.date.slice(0, 10) === thisWeekToday;

        return (
          <div key={day.date} onClick={() => setSelectedDate(day.date.slice(0, 10))} className="day">
            <div className={`day-left ${isToday ? "day-left-today" : ""}`}>
              <div className="day-left-date">{day.date.slice(8, 10)}</div>
              <div className="day-left-day">{day.day}</div>
            </div>
            <RenderMemo certainDate={day.date.slice(0, 10)} />
          </div>
        )
      })}
      <Tiptap selectedDate={selectedDate} /> */}
    </div>
  );
}

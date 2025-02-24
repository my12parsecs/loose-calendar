"use client"

// ClientWeekData.js - Data fetching utility
import jstz from 'jstimezonedetect';
import getUserLocale from 'get-user-locale';
import dayjs from 'dayjs';
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");

export default function ClientWeek(which, number) {

  // ユーザーのタイムゾーンを取得 Asia/Tokyoとか
  const tz = jstz.determine();
  const userTimezone = tz.name();
  
  // ユーザーのLocaleを取得
  const userLocale = getUserLocale();
  const userLanguage = userLocale.slice(0, 2);
  
  // Set up dayjs
  require(`dayjs/locale/${userLanguage}`);
  dayjs.locale(userLanguage);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  
  const thisWeekToday = dayjs().tz(userTimezone).format().slice(0, 10);
  
  let startOfWeek = dayjs().tz(userTimezone).startOf("week")
  if(which == "next"){
    startOfWeek = startOfWeek.add(number * 7, "day")
  }else if(which == "prev"){
    startOfWeek = startOfWeek.subtract(number * 7, "day")
  }

  // Create week data
  const weekData = [];
  for (let i = 0; i < 7; i++) {
    weekData.push({
      date: startOfWeek.add(i, "day").format(),
      day: startOfWeek.add(i, "day").format("ddd"),
    });
  }
  
  return {
    thisWeek: weekData,
    fetchWeekData: async () => {
      // Get week dates for API
      const weekDates = weekData.map(day => day.date.split('T')[0]);
      
      try {
        const response = await fetch(`/api/getPostWeek?dates=${weekDates.join(',')}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching memos:", error);
        return null;
      }
    }
  };
}
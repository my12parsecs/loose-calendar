"use client";

import dayjs, { Dayjs } from "dayjs";

import "../stylesheets/calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClientWeek from "./ClientWeek";
import ClientToday from "./ClientToday";

import jstz from "jstimezonedetect";
import getUserLocale from "get-user-locale";
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");


let monthNames = []


// import LocaleData from "dayjs/plugin/localeData";
// dayjs.extend(LocaleData);

let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarObjectGenerator = (currentDate) => {
  const numOfDaysInPrevMonth = currentDate.subtract(1, "month").daysInMonth();
  const firstDayOfCurrentMonth = currentDate.startOf("month").day();
  return {
    days: Array.from({ length: currentDate.daysInMonth() }, (_, index) => index + 1),
    day: Number(currentDate.format("DD")),
    // months: currentDate.localeData().months(),
    months: monthNames,
    prevMonthDays: Array.from({ length: firstDayOfCurrentMonth }, (_, index) => numOfDaysInPrevMonth - index).reverse(),
    remainingDays: Array.from({ length: 6 - currentDate.endOf("month").day() }, (_, index) => index + 1),
  };
};

export const Calendar = ({ which, number }) => {
    const router = useRouter();
    const path = usePathname();





    const tz = jstz.determine();
    const userTimezone = tz.name();
    
    const userLocale = getUserLocale();
    const userLanguage = userLocale.slice(0, 2);
    
    require(`dayjs/locale/${userLanguage}`);
    dayjs.locale(userLanguage);
    dayjs.extend(utc)
    dayjs.extend(timezone)
    
    for (let i = 0; i < 12; i++) {
      monthNames.push(dayjs().startOf("year").add(i, "month").format("MMMM"));
    }









    
  const thisWeek = ClientWeek(which, number).thisWeek;
  weekDays = thisWeek.map((day) => day.day);
  const clientToday = ClientToday();
  const cleanThisWeek = thisWeek.map((day) => {
    return day.date.slice(0, 10);
  });

  const [currentDate, setCurrentDate] = useState(dayjs(thisWeek[3]?.date?.slice(0, 10)));
  const [tempCurrentDate, setTempCurrentDate] = useState(dayjs(thisWeek[3]?.date?.slice(0, 10)));

  let thisMonth = +dayjs(currentDate).format("MM");
  let prevMonth = thisMonth === 1 ? 12 : thisMonth - 1;
  let nextMonth = thisMonth === 12 ? 1 : thisMonth + 1;

  useEffect(() => {
    thisMonth = +dayjs(currentDate).format("MM");
    prevMonth = thisMonth === 1 ? 12 : thisMonth - 1;    
    nextMonth = thisMonth === 12 ? 1 : thisMonth + 1;
  }, [currentDate]);

  const daysListGenerator = CalendarObjectGenerator(currentDate);  

  const dateArrowHandler = (date) => {
    setCurrentDate(date);
  };

  const handlePreviousMonthClick = (day) => {
    // const dayInPreviousMonth = currentDate.subtract(1, "month").date(day);
    // setCurrentDate(dayInPreviousMonth);
    router.push(`/${day}`);
  };

  const handleCurrentMonthClick = (day) => {
    // const dayInCurrentMonth = currentDate.date(day);
    // setCurrentDate(dayInCurrentMonth);
    router.push(`/${day}`);
  };

  const handleNextMonthClick = (day) => {
    // const dayInNextMonth = currentDate.add(1, "month").date(day);
    // setCurrentDate(dayInNextMonth);
    router.push(`/${day}`);
  };  

  return (
    <div className="calendar__container">
        <div className="month-year__layout">
          <div className="year__layout">
            <div className="title">{currentDate.year()}</div>
          </div>
          <div className="month__layout">
            <div className="new-title">{daysListGenerator.months[currentDate.month()]}</div>
            <div className="arrow-container">
                <button className="back-arrow" onClick={() => dateArrowHandler(currentDate.subtract(1, "month"))}>
                {/* <img src={backArrow} alt="back arrow" /> */}
                <FontAwesomeIcon icon={faChevronLeft} className="back-arrow-icon" />
                </button>
                <button className="forward-arrow" onClick={() => dateArrowHandler(currentDate.add(1, "month"))}>
                {/* <img src={forwardArrow} alt="forward arrow" /> */}
                <FontAwesomeIcon icon={faChevronRight} className="forward-arrow-icon" />
                </button>
            </div>
          </div>
        </div>
        <div className="day-heading-container">
          {weekDays.map((el, index) => (
            <div key={`${el}-${index}`} className="day-heading">
              {el.slice(0, 1)}
            </div>
          ))}
        </div>
        <div className="calendar__content">
          <div className={"calendar__items-list"}>
            {daysListGenerator.prevMonthDays.map((el, index) => {
              const twoDigitEl = el.toString().padStart(2, "0");
              const yearOfPrevMonth = prevMonth === 12 ? +dayjs(currentDate).format("YYYY") - 1 : +dayjs(currentDate).format("YYYY");
              const elDate = yearOfPrevMonth.toString() + "-" + prevMonth.toString().padStart(2, "0") + "-" + twoDigitEl;
              return (
                <div className={`calendar-day ${cleanThisWeek.includes(elDate) ? "calendar-this-week-day" : ""}`} key={`${el}/${index}`}>
                  <button className={`calendar__item gray ${elDate === clientToday?.today.slice(0, 10) ? "today-indicator" : ""}`} onClick={() => handlePreviousMonthClick(elDate)}>
                    {el}
                    <div className={+el === +clientToday?.today.slice(8, 10) && prevMonth === +clientToday?.today.slice(5, 7) ? "today-dot" : ""}></div>
                  </button>
                </div>
              );
            })}
            {daysListGenerator.days.map((el, index) => {
              const twoDigitEl = el.toString().padStart(2, "0");
              const elDate = currentDate.format("YYYY-MM") + "-" + twoDigitEl;

              return (
                <div key={`${index}-/-${el}`} className={`calendar-day ${cleanThisWeek.includes(elDate) ? "calendar-this-week-day" : ""}`} onClick={() => handleCurrentMonthClick(elDate)}>
                  <button className={`calendar__item ${elDate === clientToday?.today.slice(0, 10) ? "today-indicator" : ""}`}>
                    <div className="day__layout">
                      <div className="text">{el.toString()}</div>
                    </div>
                    <div className={+el === +clientToday?.today.slice(8, 10) && thisWeek[3]?.date?.slice(5, 7) === clientToday?.today.slice(5, 7) ? "today-dot" : ""}></div>
                  </button>
                </div>
              );
            })}

            {daysListGenerator.remainingDays.map((el, idx) => {
              const twoDigitEl = el.toString().padStart(2, "0");
              const yearOfNextMonth = nextMonth === 1 ? +dayjs(currentDate).format("YYYY") + 1 : +dayjs(currentDate).format("YYYY");
              const elDate = yearOfNextMonth.toString() + "-" + nextMonth.toString().padStart(2, "0") + "-" + twoDigitEl;

              return (
                <div className={`calendar-day ${cleanThisWeek.includes(elDate) ? "calendar-this-week-day" : ""}`} key={`${idx}----${el}`}>
                  <button className={`calendar__item gray ${elDate === clientToday?.today.slice(0, 10) ? "today-indicator" : ""}`} onClick={() => handleNextMonthClick(elDate)}>
                    {el}
                    <div className={+el === +clientToday?.today.slice(8, 10) && nextMonth === +clientToday?.today.slice(5, 7) ? "today-dot" : ""}></div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
    </div>
  );
};

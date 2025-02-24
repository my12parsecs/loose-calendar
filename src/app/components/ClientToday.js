"use client";

import jstz from "jstimezonedetect";
import getUserLocale from "get-user-locale";
import Link from "next/link";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");

export default function ClientToday() {

    const tz = jstz.determine();
    const userTimezone = tz.name();

    const userLocale = getUserLocale();
    const userLanguage = userLocale.slice(0, 2);

    require(`dayjs/locale/${userLanguage}`);
    dayjs.locale(userLanguage);
    dayjs.extend(utc)
    dayjs.extend(timezone)

    const today = dayjs().tz(userTimezone).format();
    const day = dayjs().tz(userTimezone).format("ddd");

    return {today, day}
}


"use client"
import { usePathname } from "next/navigation";
import ClientWeek from "../components/ClientWeek";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import getUserLocale from "get-user-locale";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

export default function NavMonth() {
  const path = usePathname();
  const pathParts = path.split("/").filter(Boolean);
  const thisWeek = ClientWeek(pathParts[0], pathParts[1]).thisWeek;
  const firstDayOfWeek = thisWeek[0]?.date?.slice(0, 10);
  const monthNumber = thisWeek[0]?.date?.slice(5, 6) == "0" ? thisWeek[0]?.date?.slice(6, 7) : thisWeek[0]?.date?.slice(5, 7);
  const [monthName, setMonthName] = useState("");

  useEffect(() => {
    const jstz = require("jstimezonedetect");
    // const getUserLocale = require("get-user-locale");
    
    const tz = jstz.determine();
    const userTimezone = tz.name();
    const userLocale = getUserLocale();
    const userLanguage = userLocale.slice(0, 2);

    require(`dayjs/locale/${userLanguage}`);
    dayjs.locale(userLanguage);

    const calculatedMonth = dayjs(firstDayOfWeek).tz(userTimezone).format("MMM");
    
    setMonthName(calculatedMonth);
  }, [firstDayOfWeek]);

  return (
    (path === "/" || pathParts[0] == "next" || pathParts[0] == "prev") &&  <div className="nav-month-container">
        <div className="nav-month">{monthNumber}</div>
      </div>
    );
}






// "use client"


// import { usePathname } from "next/navigation";
// import ClientWeek from "../components/ClientWeek";

// import jstz from "jstimezonedetect";
// import getUserLocale from "get-user-locale";
// import Link from "next/link";
// import dayjs from "dayjs";
// var utc = require("dayjs/plugin/utc");
// var timezone = require("dayjs/plugin/timezone");


// export default function NavMonth(){
//     const path = usePathname()
//     const pathParts = path.split("/").filter(Boolean);

//     const thisWeek = ClientWeek(pathParts[0], pathParts[1]).thisWeek
//     const firstDayOfWeek = thisWeek[0]?.date?.slice(0, 10)
//     // console.log(firstDayOfWeek);

//     const hello = dayjs(firstDayOfWeek).format("LLL");
//     // console.log(hello);



//     const tz = jstz.determine();
//     const userTimezone = tz.name();

//     const userLocale = getUserLocale();
//     const userLanguage = userLocale.slice(0, 2);

//     require(`dayjs/locale/${userLanguage}`);
//     dayjs.locale(userLanguage);
//     dayjs.extend(utc)
//     dayjs.extend(timezone)

//     var localizedFormat = require("dayjs/plugin/localizedFormat");
//     dayjs.extend(localizedFormat)

//     const monthName = dayjs(firstDayOfWeek).tz(userTimezone).format("MMMM");
//     console.log(monthName);
    
    

//     return(
//         <div className="nav-month-container">
//             {/* {thisWeek[0]?.date?.slice(5, 7)} */}
//             {/* {thisWeek[0]?.date?.slice(5, 6) === "0" ? <div className="nav-month">{thisWeek[0]?.date?.slice(6, 7)}</div> : <div className="nav-month">{thisWeek[0]?.date?.slice(5, 7)}</div>} */}
//             <div className="nav-month">{monthName}</div>
//         </div>
//     )
// }
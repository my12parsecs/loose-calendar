

import "../stylesheets/page.css";

import ClientWeek from "../components/ClientWeek";
import RenderMemo from "../components/RenderMemo";
// import RenderDate from "../components/RenderDate";
// import RenderDay from "../components/RenderDay";
import RenderLeft from "../components/RenderLeft";
import ShortcutMenu from "../components/ShortcutMenu";

export default function Home() {

  return (
    <div className="main">
        <div className="main-left">
        {Array.from({ length: 7 }).map((_, index) => (
            // <div className={`day-left ${isToday ? "day-left-today" : ""}`} key={index}>
            //     <div className="day-left-date">
            //         <RenderDate clientWeek={ClientWeek} index={index} />
            //     </div>
            //     <div className="day-left-day">
            //         <RenderDay clientWeek={ClientWeek} index={index} />
            //     </div>
            // </div>
            <RenderLeft ClientWeek={ClientWeek} which="this" number={0} index={index} key={index} />
        ))}
        </div>
        <div className="main-right">
            <RenderMemo clientWeek={ClientWeek} which="this" number={0} />
        </div>

    <div className="footer-nav"></div>

    <ShortcutMenu />

    </div>
  );
}

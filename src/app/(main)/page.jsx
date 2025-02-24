

import "../stylesheets/page.css";

import ClientWeek from "../components/ClientWeek";
import RenderMemo from "../components/RenderMemo";
import RenderDate from "../components/RenderDate";
import RenderDay from "../components/RenderDay";

export default function Home() {

    const isToday = false

  return (
    <div className="main">
        <div className="main-left">
        {Array.from({ length: 7 }).map((_, index) => (
            <div className={`day-left ${isToday ? "day-left-today" : ""}`} key={index}>
                <div className="day-left-date">
                    <RenderDate clientWeek={ClientWeek} index={index} />
                </div>
                <div className="day-left-day">
                    <RenderDay clientWeek={ClientWeek} index={index} />
                </div>
            </div>
        ))}
        </div>
        <div className="main-right">
            <RenderMemo clientWeek={ClientWeek} />
        </div>

    <div className="footer-nav"></div>

    </div>
  );
}

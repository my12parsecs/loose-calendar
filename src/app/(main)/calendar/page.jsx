
import CalendarPageCalendar from "../../components/CalendarPageCalendar";
import "../../stylesheets/calendar-page.css";

export default function CalendarPage() {
    return (
        <div className="page">
            <h1 style={{borderBottom: "0.5px solid rgb(54, 54, 54)"}}>Calendar</h1>
            <p>Click on the date to quickly go to the memo.</p>
            <CalendarPageCalendar />
        </div>
    )
}
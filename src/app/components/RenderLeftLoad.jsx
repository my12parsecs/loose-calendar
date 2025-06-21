
export default function RenderLeftLoad() {

  // Only render the actual content client-side after mounting
  return (
    <div className={`day-left`}>
      <div className="day-left-inner">
        <div className="day-left-date">
        </div>
        <div className="day-left-day"></div>
      </div>
    </div>
  );
}

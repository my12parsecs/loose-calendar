

import "../stylesheets/page.css";

import ClientWeek from "../components/ClientWeek";
import RenderMemo from "../components/RenderMemo";
import RenderLeft from "../components/RenderLeft";
import ShortcutMenu from "../components/ShortcutMenu";
import FooterNav from "../components/FooterNav";


export default function Home() {

  return (
    <div className="main-page">
      <div className="main">
        <div className="main-left">
        {Array.from({ length: 7 }).map((_, index) => (
            <RenderLeft ClientWeek={ClientWeek} which="this" number={0} index={index} key={index} />
        ))}
        </div>
        <div className="main-right">
            <RenderMemo clientWeek={ClientWeek} which="this" number={0} />
        </div>

      <ShortcutMenu which="main" />

      </div>
      <FooterNav />
    </div>
  );
}

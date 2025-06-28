import "../../stylesheets/page.css";

import ClientWeek from "../../components/ClientWeek";
import RenderMemo from "../../components/RenderMemo";
import RenderLeft from "../../components/RenderLeft";
import ShortcutMenu from "../../components/ShortcutMenu";
import FooterNav from "../../components/FooterNav";
import { auth } from "../../../../auth";
import Calendar from "../../components/Calendar";
import "../../stylesheets/calendar.css";

export default async function Home() {
   const session = await auth();

   return (
      <div className="main-page">
         <div className="main">
            <div className="main-left">
               {Array.from({ length: 7 }).map((_, index) => (
                  <RenderLeft ClientWeek={ClientWeek} which="this" number={0} index={index} key={index} />
               ))}
            </div>
            <div className="main-right">
               <RenderMemo clientWeek={ClientWeek} which="this" number={0} session={session} />
            </div>

            <ShortcutMenu which="main" />
         </div>
         <FooterNav />

         <Calendar which="this" number={0} />
      </div>
   );
}

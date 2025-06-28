import "../../stylesheets/page.css";

// import ClientWeek from "../../components/ClientWeek";
// import RenderMemo from "../components/RenderMemo";
import RenderMemoLoad from "../../components/RenderMemoLoad";
import RenderLeft from "../../components/RenderLeft";
import RenderLeftLoad from "../../components/RenderLeftLoad";
import ShortcutMenu from "../../components/ShortcutMenu";
import FooterNav from "../../components/FooterNav";
// import { auth } from "../../../auth";
import Calendar from "../../components/Calendar";
import "../../stylesheets/calendar.css";

export default function Home() {
   //   const session = await auth()

   return (
      <div className="main-page">
         <div className="main">
            <div className="main-left">
               {Array.from({ length: 7 }).map((_, index) => (
                  <RenderLeftLoad />
               ))}
            </div>
            <div className="main-right">
               <RenderMemoLoad />
            </div>

            <ShortcutMenu which="main" />
         </div>
         <FooterNav />

         <Calendar which="this" number={0} />
      </div>
   );
}

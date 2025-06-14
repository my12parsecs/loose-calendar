
import "../../../stylesheets/page.css";

import ClientWeek from "../../../components/ClientWeek";
import RenderMemo from "../../../components/RenderMemo";
import RenderLeft from "../../../components/RenderLeft";
import ShortcutMenu from "../../../components/ShortcutMenu";
import Calendar from "../../../components/Calendar";
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";


export default async function Home({params}) {
    const slug = (await params).slug
   const session = await auth()
    
    
    if(parseInt(slug) < 1 || !parseInt(slug) || !slug || parseInt(slug) > 100){
        redirect("/")
    }

    return (
        <div className="main">
            <div className="main-left">
            {Array.from({ length: 7 }).map((_, index) => (
                <RenderLeft ClientWeek={ClientWeek} which="next" number={slug} index={index} key={index} />
            ))}
            </div>
            <div className="main-right">
                <RenderMemo clientWeek={ClientWeek} which="next" number={slug} session={session} />
            </div>

            <ShortcutMenu />

            <Calendar which="next" number={slug} />
        </div>
  );
}

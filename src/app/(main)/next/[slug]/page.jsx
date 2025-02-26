
import "../../../stylesheets/page.css";

import ClientWeek from "../../../components/ClientWeek";
import RenderMemo from "../../../components/RenderMemo";
import RenderLeft from "../../../components/RenderLeft";
import ShortcutMenu from "../../../components/ShortcutMenu";
import { redirect } from "next/navigation";

export default async function Home({params}) {
    const slug = (await params).slug
    
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
                <RenderMemo clientWeek={ClientWeek} which="next" number={slug} />
            </div>

            <ShortcutMenu />

        </div>
  );
}

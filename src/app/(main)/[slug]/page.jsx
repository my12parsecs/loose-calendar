

import "../../stylesheets/page.css";
import Editor from "../../components/Editor";
import { notFound } from 'next/navigation';
import ClientWeek from "../../components/ClientWeek";
import ShortcutMenu from "../../components/ShortcutMenu";
import { auth } from "../../../../auth";
import Calendar from "../../components/Calendar";
import "../../stylesheets/calendar.css";
import dayjs from "dayjs";

export default async function Slug({params}) {
    const slug = (await params).slug

    const slugRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!slugRegex.test(slug)) {
      notFound();
    }

    const session = await auth()

    const year = slug.slice(0, 4)
    const month = slug.slice(5, 7);
    const day = slug.slice(8, 10);

    const propsCurrentDate = dayjs(`${year}-${month}-${day}`).startOf('week').add(3, 'day').format('YYYY-MM-DD');
    console.log(propsCurrentDate);
    

    const selectedDay = ""
    
    return (
    <div className="slug-page">
        {/* <Tiptap selectedDate={`${month}-${day}`} selectedDay={selectedDay} /> */}
        <Editor selectedDate={slug} selectedDay={selectedDay} clientWeek={ClientWeek} session={session} /> 
        <ShortcutMenu which="slug" />

        <Calendar propsCurrentDate={propsCurrentDate} />
    </div>
    )
}
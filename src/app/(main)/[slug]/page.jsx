

import "../../stylesheets/page.css";
import Editor from "../../components/Editor";
import { notFound } from 'next/navigation';
import ClientWeek from "../../components/ClientWeek";

export default async function Slug({params}) {
    const slug = (await params).slug

    const slugRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!slugRegex.test(slug)) {
      notFound();
    }
    console.log(slug);
    const year = slug.slice(0, 4)
    const month = slug.slice(5, 7);
    const day = slug.slice(8, 10);

    const selectedDay = ""
    
    return (
    <div className="slug-page">
        {/* <Tiptap selectedDate={`${month}-${day}`} selectedDay={selectedDay} /> */}
        <Editor selectedDate={slug} selectedDay={selectedDay} clientWeek={ClientWeek} />    
    </div>
    )
}
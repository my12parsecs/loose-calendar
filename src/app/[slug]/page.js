
// import Tiptap from "../components/Tiptap";
// import "../stylesheets/page.css";

// export default async function Editor({params}) {
//     const slug = (await params).slug
//     console.log(slug);
//     const month = slug.slice(0, 2);
//     const day = slug.slice(2, 4);

//     const selectedDay = "Mon"
    
//     return (
//     <div className="main">
//         <Tiptap selectedDate={`${month}-${day}`} selectedDay={selectedDay} />
//     </div>
//     )
// }

import { redirect } from 'next/navigation';

export default function Slug() {
  redirect('/');
}

import Link from 'next/link';

import "../../stylesheets/about.css";


export const metadata = {
    title: 'About | Loose Calendar',
    description: 'About page of Loose Calendar',
    openGraph: {
      title: 'About | Loose Calendar',
      description: 'About page of Loose Calendar',
    },
  }

export default function Loading() {

    return (
    <div className="about-page" style={{height: '100%'}}>
        <h1>Loose Calendar</h1>
        <h2>is a Calendar where each day has a little memo.</h2>
        <p>If you don't like how every other calendar forces you to add "events" and enter the time, this is for you. You can loosely jot down what you need to do each day.</p>
        <p>There are timestamps for better visibility. For example, @7-9 is converted to <span className='time-tag'>@7:00~9:00</span>on the editor. <Link href="/editor" style={{textDecoration: "underline"}}>More about time stamps</Link>.</p>
        <p>If you're on desktop, <Link href="/hotkeys" style={{textDecoration: "underline"}}>Hotkeys</Link> are useful.</p>


        <Link href="/" className='go-to-calendar-button-container'>
            <div className='go-to-calendar-button'>Go to Loose Calendar</div>
        </Link>

    </div>
    )
}

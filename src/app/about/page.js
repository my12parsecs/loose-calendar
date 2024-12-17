
import Link from 'next/link';

import jstz from 'jstimezonedetect';
import getUserLocale from 'get-user-locale';

import "../stylesheets/about.css";
import ClientTimeLocale from "../components/ClientTimeLocale";
import ProductHunt from '../components/ProductHunt';


export const metadata = {
    title: 'About | Loose Calendar FTW',
    description: 'About page of Loose Calendar FTW',
    openGraph: {
      title: 'About | Loose Calendar FTW',
      description: 'About page of Loose Calendar FTW',
    },
  }

export default function About() {

    return (
    <div className="about-page" style={{height: '100%', minHeight: 'calc(100dvh - 35px)'}}>
        <h1>Loose Calendar for the Week</h1>
        <h2>is a Calendar where each day has a little memo. Just for this week.</h2>
        <p>Don't need something fancy and complicated like Google Calendar? Use this!</p>
        <p>It stores data in your browser's local storage, none of your data is sent to the server. There's no database. Every memo outside of this week is deleted on load. Each week starts from Sunday and ends on Saturday.</p>
        <p>You should not write anything super important here. It will be deleted once the week is over.</p>
        <p>I made this in a couple of hours, so please tell me if you find any bugs. Especially the timezone/language stuff. It's supposed to reflect your timezone and language, but I'm not sure if it works on all devices.</p>

        <ClientTimeLocale />

        <div className='go-to-calendar-button-container'>
            <Link href="/" className='go-to-calendar-button'>Go to Loose Calendar</Link>
        </div>

        <ProductHunt />

    </div>
    )
}



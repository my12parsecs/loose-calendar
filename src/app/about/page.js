
import Link from 'next/link';

import jstz from 'jstimezonedetect';
import getUserLocale from 'get-user-locale';

import "../stylesheets/about.css";

export default function About() {

    var tz = jstz.determine();
    const userTimezone = tz.name();

    const userLocale = getUserLocale();
    const userLanguage = userLocale.slice(0, 2);
    
    return (
    <div className="about-page">
        <h1>Loose Calendar for the Week</h1>
        <h2>is a Calendar where each day has a little memo.</h2>
        <p>Don't need something fancy and complicated like Google Calendar? Use this!</p>
        <p>It stores data in your browser's local storage, none of your data is sent to the server. There's no database.</p>
        <p>I made this in a couple of hours, so please tell me if you find any bugs. Especially the timezone/language stuff. It's supposed to reflect your timezone and language, but I'm not sure if it works on all devices.</p>

        <div>
            <div>Your Timezone: {userTimezone}</div>
            <div>Your Language: {userLanguage}</div>
        </div>

        <div className='go-to-calendar-button-container'>
            <Link href="/" className='go-to-calendar-button'>Go to Loose Calendar</Link>
        </div>

    </div>
    )
}



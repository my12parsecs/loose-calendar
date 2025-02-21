"use client";

import { useState, useEffect } from "react";
import jstz from "jstimezonedetect";
import getUserLocale from "get-user-locale";
import Link from "next/link";

export default function ClientTimeLocale() {
  const [userTimezone, setUserTimezone] = useState("");
  const [userLanguage, setUserLanguage] = useState("");

  useEffect(() => {
    const tz = jstz.determine();
    setUserTimezone(tz.name());

    const userLocale = getUserLocale();
    setUserLanguage(userLocale.slice(0, 2));

    // Override the height of the body to auto
    const originalStyle = document.body.style.height;
    document.body.style.height = "auto";
    return () => {
      document.body.style.height = originalStyle;
    };
  }, []);

  return (
    <div className="client-time-locale">
      <div className="client-time"><span>Your Timezone:</span> {userTimezone}</div>
      <div className="client-locale"><span>Your Language:</span> {userLanguage}</div>
    </div>
  );
}

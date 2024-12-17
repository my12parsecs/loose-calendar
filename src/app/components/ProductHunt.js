"use client";

import { useEffect, useState } from "react";

export default function ProductHunt() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    prefersDarkMode.matches ? setIsLightMode(false) : setIsLightMode(true);
  }, []);

  return (
    <div className="product-hunt-container">
      {isLightMode ? (
        <a href="https://www.producthunt.com/posts/loose-calendar-for-the-week?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-loose-calendar-for-the-week" target="_blank">
          <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=711343&theme=neutral" alt="Loose Calendar for the Week - A calendar where each day is a memo. Just for this week. | Product Hunt" style={{ width: 250, height: 54 }} width={250} height={54} />
        </a>
      ) : (
        <a href="https://www.producthunt.com/posts/loose-calendar-for-the-week?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-loose-calendar-for-the-week" target="_blank">
          <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=711343&theme=dark" alt="Loose Calendar for the Week - A calendar where each day is a memo. Just for this week. | Product Hunt" style={{ width: 250, height: 54 }} width={250} height={54} />
        </a>
      )}
    </div>
  );
}

import { Inter, Cardo } from "next/font/google";

import "./stylesheets/globals.css";
import Nav from "./components/Nav";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cardo = Cardo({
  weight: "400",
  variable: "--font-cardo",
  subsets: ["latin"],
});


export const metadata = {
  title: "Loose Calendar for the Week",
  description: "Loose Calendar for the Week is a Calendar where each day has a little memo. You just use it for this week.",
  keywords: ['loose', 'calendar', 'memo', 'week', 'loose calendar', 'loose calendar for the week'],
  openGraph: {
    title: 'Loose Calendar for the Week',
    description: 'Loose Calendar for the Week is a Calendar where each day has a little memo. You just use it for this week.',
    url: 'https://loosecal.com',
    images: [
      {
        url: 'https://example.com/image.jpg',
        width: 800,
        height: 600,
        alt: 'Loose Calendar Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loose Calendar for the Week',
    description: 'Loose Calendar for the Week is a Calendar where each day has a little memo. You just use it for this week.',
    images: ['https://example.com/image.jpg'],
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body className={`${inter.variable} ${cardo.variable}`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}

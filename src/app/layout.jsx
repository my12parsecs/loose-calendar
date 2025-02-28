
import { Inter, EB_Garamond } from "next/font/google";

import "./stylesheets/globals.css";
import Hotkeys from "./components/Hotkeys";
import toast, { Toaster } from 'react-hot-toast';



const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// const cardo = Cardo({
//   weight: "400",
//   variable: "--font-cardo",
//   subsets: ["latin"],
// });
const garamond = EB_Garamond({
  variable: "--font-logo",
  subsets: ["latin"],
});


export const metadata = {
  title: "Loose Calendar",
  description: "Loose Calendar is a Calendar where each day has a little memo.",
  keywords: ['loose', 'calendar', 'memo', 'week', 'loose calendar'],
  openGraph: {
    title: 'Loose Calendar',
    description: 'Loose Calendar is a Calendar where each day has a little memo.',
    url: 'https://loosecal.com',
    images: [
      {
        url: 'https://utfs.io/f/XBVzUJO68SmlrX8z5gM13s50u9ZcTLxUedCh6PlDAnz72REm',
        width: 500,
        height: 500,
        alt: 'Loose Calendar Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loose Calendar',
    description: 'Loose Calendar is a Calendar where each day has a little memo.',
    images: ['https://utfs.io/f/XBVzUJO68SmlrX8z5gM13s50u9ZcTLxUedCh6PlDAnz72REm'],
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${inter.variable} ${garamond.variable}`}>
        <Hotkeys />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

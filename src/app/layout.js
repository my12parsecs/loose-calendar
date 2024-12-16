import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./stylesheets/globals.css";
import Nav from "./components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata = {
  title: "Loose Calendar for the Week",
  description: "Loose Calendar for the Week",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body className={`${inter.variable}`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}

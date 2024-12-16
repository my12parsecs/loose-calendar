import { Geist, Geist_Mono, Inter, Cardo } from "next/font/google";
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

const cardo = Cardo({
  weight: "400",
  variable: "--font-cardo",
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
      <body className={`${inter.variable} ${cardo.variable}`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}

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

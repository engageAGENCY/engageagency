import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playlist = localFont({
  src: "../public/fonts/playlist-script.woff",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-logo",
});
const glacial = localFont({
  src: [
    { path: "../public/fonts/glacial-indifference-regular.woff", weight: "400", style: "normal" },
    { path: "../public/fonts/glacial-indifference-bold.woff", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-geo",
});

export const metadata: Metadata = {
  title: "Agencia Premium",
  description: "Generado por Script de Python",
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${oswald.variable} ${inter.variable} ${playlist.variable} ${glacial.variable}`}>
      <body className="bg-background text-white antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

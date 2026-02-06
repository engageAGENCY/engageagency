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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://engagencydo.com"),
  title: "Engage Agency",
  description:
    "Somos un grupo creativo comprometidos de llevar tu marca al pr\u00f3ximo nivel en el mundo digital.",
  openGraph: {
    title: "Engage Agency",
    description:
      "Somos un grupo creativo comprometidos de llevar tu marca al pr\u00f3ximo nivel en el mundo digital.",
    type: "website",
    siteName: "Engage Agency",
    images: [
      {
        url: "/logo-engage.jpg",
        width: 800,
        height: 800,
        alt: "Engage Agency",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-32.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engage Agency",
    description:
      "Somos un grupo creativo comprometidos de llevar tu marca al pr\u00f3ximo nivel en el mundo digital.",
    images: ["/logo-engage.jpg"],
  },
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

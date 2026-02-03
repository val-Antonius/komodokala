import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Keeping these as they are good defaults, or I could switch to Inter to match old project if needed.
import "./globals.css";
import { Navbar } from "@/sections/Navbar";
import { Footer } from "@/sections/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Komodo Adventures | Labuan Bajo Tours",
  description: "Discover the Wonders of Komodo National Park with the #1 Rated Tour Operator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

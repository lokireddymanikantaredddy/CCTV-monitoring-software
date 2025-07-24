import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MandlacX",
  description: "MandlacX Edge",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" />
      <body className="bg-[#181A20] min-h-screen">
      <div
  className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 z-0"
  style={{
    width: 725,
    height: 180,
    background: 'radial-gradient(ellipse at center, rgba(208,167,4,0.35) 0%, rgba(208,167,4,0.00) 80%)',
    filter: 'blur(80px)',
  }}
/>
        
        <Navbar />
        <main className="max-w-[1600px] mx-auto flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

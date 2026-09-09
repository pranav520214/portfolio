import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pranav Mishra — AI × Systems × Hardware",
  description:
    "I build at the intersection of artificial intelligence, software and engineering systems. Student engineer working on local AI, desktop systems, embedded firmware, and dynamic simulation.",
  keywords: [
    "Pranav Mishra",
    "LocalFlow",
    "AUTOSTABI",
    "ESP32 BLE Wand Mouse",
    "PRIVAVEDA",
    "FS-i6X BLE FPV Controller",
    "Local AI",
    "Desktop Systems",
    "Embedded Systems",
    "Simulation",
    "Engineering Design"
  ],
  authors: [{ name: "Pranav Mishra" }],
  openGraph: {
    title: "Pranav Mishra — AI × Systems × Hardware",
    description:
      "I build at the intersection of artificial intelligence, software and engineering systems.",
    type: "website",
    url: "https://portfolio-beta-seven-lg5a84gms1.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0D0F12] text-[#F1F5F9] selection:bg-[#F59E0B] selection:text-[#0D0F12]">
        {children}
      </body>
    </html>
  );
}

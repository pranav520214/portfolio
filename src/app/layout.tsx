import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pranav Kumar Mishra — Systems, Silicon & Physical Computing",
  description:
    "Building intelligent systems across software, silicon, and the physical world. Student engineer working on local speech AI, embedded microcontroller firmware, and mechanistic simulation.",
  keywords: [
    "Pranav Kumar Mishra",
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
    "Control Theory",
    "Engineering Design"
  ],
  authors: [{ name: "Pranav Kumar Mishra" }],
  creator: "Pranav Kumar Mishra",
  metadataBase: new URL("https://portfolio-beta-seven-lg5a84gms1.vercel.app"),
  openGraph: {
    title: "Pranav Kumar Mishra — Systems, Silicon & Physical Computing",
    description:
      "Building intelligent systems across software, silicon, and the physical world. Local AI • Embedded Firmware • Flight Avionics • ODE Simulation.",
    type: "website",
    url: "https://portfolio-beta-seven-lg5a84gms1.vercel.app",
    siteName: "Pranav Kumar Mishra Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranav Kumar Mishra — Systems, Silicon & Physical Computing",
    description:
      "Building intelligent systems across software, silicon, and the physical world.",
    creator: "@theaviatorpran",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-[#07080A] text-[#F1F5F9] selection:bg-[#D94431]/30 selection:text-[#F1F5F9]">
        {children}
      </body>
    </html>
  );
}

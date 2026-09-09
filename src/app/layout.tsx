import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRANAV // CS + AI + Engineering Design",
  description:
    "Interactive 3D laboratory and engineering portfolio of Pranav Kumar Mishra. Class XI student builder researching compact multilingual speech models, verification-first software assurance, and embedded flight avionics.",
  keywords: [
    "Pranav Mishra",
    "AI Research",
    "Streaming ASR",
    "Rudra Sentinel",
    "ESCL-II",
    "Flight Avionics",
    "ESP32",
    "Kalman Filter",
    "Software Assurance",
    "Aerospace"
  ],
  authors: [{ name: "Pranav Kumar Mishra" }],
  openGraph: {
    title: "PRANAV // CS + AI + Engineering Design",
    description: "Young genius engineer / builder / researcher portfolio.",
    type: "website",
    url: "https://github.com/pranav520214",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-blueprint-950 text-technical-white selection:bg-comic-yellow selection:text-blueprint-950">
        {children}
      </body>
    </html>
  );
}

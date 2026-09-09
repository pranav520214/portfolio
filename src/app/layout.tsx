import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pranav — CS, AI & Engineering Design",
  description:
    "Personal engineering portfolio documenting experiments in small language models, embedded avionics, software systems, and aerospace engineering.",
  keywords: [
    "Pranav Mishra",
    "Computer Science",
    "Artificial Intelligence",
    "Streaming ASR",
    "Rudra Sentinel",
    "ESCL-II",
    "Flight Avionics",
    "ESP32",
    "Kalman Filter",
    "Software Assurance",
    "Engineering Design"
  ],
  authors: [{ name: "Pranav Mishra" }],
  openGraph: {
    title: "Pranav — CS, AI & Engineering Design",
    description:
      "Personal engineering portfolio documenting experiments in small language models, embedded avionics, software systems, and aerospace engineering.",
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
      <body className="antialiased bg-[#F5F4EF] text-[#111111] selection:bg-[#111111] selection:text-[#F5F4EF]">
        {children}
      </body>
    </html>
  );
}

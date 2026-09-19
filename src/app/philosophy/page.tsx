import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PhilosophyBridge } from "@/components/experience/PhilosophyBridge";
export const metadata: Metadata = { title: "My Engineering Philosophy — Pranav Mishra" };
const principles = [
  ["Start with the constraint.", "What is limited: power, memory, time, precision? I begin there. A useful design makes its tradeoffs visible before it makes promises."],
  ["Build to learn.", "A small working prototype asks better questions than a perfect diagram. I make the simplest version that can teach me something about the real problem."],
  ["Let failure leave a trace.", "Sensor noise, buffer ownership, a solver that diverges: these are useful observations. I document what broke, what I changed and what happened next."],
  ["Measure before you claim.", "A number needs a setup, a method and a boundary. I keep evidence close to the work and distinguish an experiment from a proven result."],
  ["Leave the door open.", "Code, notes and honest limitations make a project easier to question and improve. Good engineering gives the next person somewhere to begin."],
];
export default function PhilosophyPage() {
  return <main className="philosophy-page"><header><Link href="/introduction#milestones"><ArrowLeft size={15} /> BACK TO THE GARDEN</Link><Link href="/">PRANAV / GAMES</Link></header><PhilosophyBridge fullPage /><div className="philosophy-principles">{principles.map(([title, body], i) => <article key={title}><span>0{i + 1}</span><h2>{title}</h2><p>{body}</p></article>)}<Link href="/introduction#contact" className="atlas-button">Let’s build something <ArrowUpRight size={16} /></Link></div></main>;
}

import type { Metadata } from "next";
import { PortfolioExperience } from "@/components/experience/PortfolioExperience";
import { getAllNotes } from "@/lib/markdown";
export const metadata: Metadata = { title: "Meet Pranav — Ideas, Code & Engineering", description: "Namaste. I'm Pranav Kumar Mishra. Explore my work in AI, hardware and engineering design, and the ideas behind it." };
export default function IntroductionPage() { return <PortfolioExperience notes={getAllNotes().map(({ slug, title }) => ({ slug, title }))} />; }

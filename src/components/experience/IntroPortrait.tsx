"use client";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolioContent";

export function IntroPortrait() {
  return <section id="hero" className="studio-hero">
    <div>
      <p className="chapter-label">01 / The person behind the projects</p>
      <h1 tabIndex={-1}>PRANAV<span>MISHRA.</span></h1>
      <p className="hero-description">I turn curious questions into things that work.</p>
      <p className="hero-subtext">Namaste. I’m {PERSONAL_INFO.name}, a student engineer in {PERSONAL_INFO.location}. I build across AI, embedded systems and engineering design — from code on a laptop to hardware on the workbench.</p>
      <div className="hero-actions"><a href="#work" className="atlas-button">Explore my work <ArrowDown size={16} /></a><a href={SOCIAL_LINKS.github.url} target="_blank" rel="noopener noreferrer" className="atlas-link">GitHub <ArrowUpRight size={15} /></a></div>
    </div>
    <figure className="portrait-poster">
      <div className="portrait-topline"><span>THE MAKER / EST. CURIOUS</span><span>INDIA ↗</span></div>
      <Image src="/hero/hero-portrait.png" alt="Illustrated portrait of Pranav Kumar Mishra" width={1071} height={829} priority sizes="(max-width: 760px) 80vw, 42vw" className="portrait-image" />
      <figcaption className="portrait-caption"><span>IDEAS. CODE. DESIGN. BUILD.</span><span>2026</span></figcaption>
      <span className="portrait-stamp">WORK IN<br />PROGRESS, ALWAYS.</span>
    </figure>
    <div className="hero-footnote"><span>AI × PHYSICAL COMPUTING × A LITTLE PLAY</span><a href="#assembly">SCROLL TO CONNECT THE DOTS <ArrowDown size={14} /></a></div>
  </section>;
}

"use client";
import { CSSProperties, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { CONSTELLATIONS, GreetingConstellation, GreetingStar } from "@/data/constellations";
import { NamasteMark, IndianFlag } from "./NamasteMark";
import { PortalLink } from "../portal/PortalLink";
import { useSceneActivity } from "../experience/useSceneActivity";

function Constellation({ constellation, onSelect }: {
  constellation: GreetingConstellation; onSelect: (star: GreetingStar) => void;
}) {
  return <section className={`greeting-constellation constellation-${constellation.id}`} style={{ "--star-color": constellation.color } as CSSProperties} aria-labelledby={`${constellation.id}-title`}>
    <div className="constellation-heading">
      <h2 id={`${constellation.id}-title`}>{constellation.name}</h2>
      {constellation.id === "orion" && <IndianFlag />}<span>{constellation.subtitle}</span>
    </div>
    <div className="constellation-map">
      <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {constellation.edges.map(([a, b]) => <line key={`${a}-${b}`} x1={constellation.stars[a].x} y1={constellation.stars[a].y} x2={constellation.stars[b].x} y2={constellation.stars[b].y} vectorEffect="non-scaling-stroke" />)}
      </svg>
      {constellation.stars.map((star, index) => <button key={star.language} className="greeting-star"
        style={{ left: `${star.x}%`, top: `${star.y}%`, "--pulse-delay": `${index * -.8}s` } as CSSProperties}
        onClick={() => onSelect(star)} onFocus={() => onSelect(star)} onMouseEnter={() => onSelect(star)}
        aria-label={`${star.greeting} — ${star.language} greeting, ${star.pronunciation}`}>
        <NamasteMark /><span lang={star.code} dir={star.code === "ar" ? "rtl" : undefined}>{star.greeting}</span><small>{star.language}</small>
      </button>)}
    </div>
  </section>;
}

export function ConstellationIntro() {
  const ref = useRef<HTMLElement>(null);
  const active = useSceneActivity(ref);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<GreetingStar | null>(null);
  useEffect(() => {
    const hash = window.location.hash;
    if (/^#(hero|about|work|philosophy|capabilities|research|notebook|privantrix|milestones|vision|contact)$/.test(hash)) window.location.replace(`/introduction${hash}`);
  }, []);
  return <main ref={ref} className="shared-sky" data-active={active && !paused}>
    <header className="sky-header">
      <Link href="/" className="sky-signature"><span className="signature-cross">✳</span> PRANAV MISHRA <span className="signature-divider">/</span> <span className="signature-caption">A PERSONAL UNIVERSE</span></Link>
      <Link href="/introduction" className="sky-skip">Skip intro <ArrowUpRight size={14} /></Link>
    </header>
    <div className="sky-coordinate sky-coordinate-top" aria-hidden="true">FIELD NOTES FROM A SHARED SKY — VOL. 02</div>
    <div className="sky-orbits" aria-hidden="true"><i /><i /><i /></div>
    <div className="sky-composition">
      {CONSTELLATIONS.map((c) => <Constellation key={c.id} constellation={c} onSelect={setSelected} />)}
      <div className="sky-center">
        <div className="center-emblem"><NamasteMark /><span>PG</span></div>
        <p className="sky-eyebrow">MANY LANGUAGES. ONE WELCOME.</p>
        <h1 className="pranav-wordmark">PRANAV<span>GAMES<span className="wordmark-asterisk">✳</span></span></h1>
        <p className="sky-invitation">A little curiosity. <br />An entire universe to build.</p>
        <nav className="name-portals" aria-label="Choose a name portal">
          <PortalLink href="/introduction" className="name-portal">Pranav <ArrowDownRight size={14} /></PortalLink>
          <PortalLink href="/introduction" className="name-portal">Pranam <ArrowDownRight size={14} /></PortalLink>
          <PortalLink href="/introduction" className="name-portal"><span lang="hi">प्रणव</span> <ArrowDownRight size={14} /></PortalLink>
        </nav><p className="portal-instruction">CHOOSE A NAME. STEP INSIDE.</p>
      </div>
    </div>
    <footer className="sky-footer">
      <span className="sky-edition">04 CONSTELLATIONS <span>/</span> 22 HELLOS</span>
      <p className="greeting-readout" role="status" aria-live="polite">{selected ? <><span lang={selected.code}>{selected.greeting}</span> · {selected.pronunciation} · A welcome in {selected.language}</> : "Every greeting is a star. Touch one to say hello."}</p>
      <button className="motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={13} /> : <Pause size={13} />} <span>{paused ? "Resume" : "Pause"} motion</span></button>
    </footer>
  </main>;
}

"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { FLAGSHIP_PROJECTS } from "@/data/portfolioContent";
import { PROJECT_MEDIA } from "@/data/projectMedia";
import { useSceneActivity } from "../experience/useSceneActivity";

function Towers() {
  return <svg className="tower-drawing" viewBox="0 0 1100 500" preserveAspectRatio="none" fill="none" aria-hidden="true">
    <path d="M15 465H1085" stroke="#748060" strokeOpacity=".3" />
    {[140, 960].map((x, i) => <g key={x} stroke="#899773" strokeWidth="1.6">
      <path d={`M${x - 65} 465 ${x - 12} 100H${x + 12}L${x + 65} 465M${x - 60} 435l100-70-85-55 70-65-54-55 42-60M${x + 60} 435l-100-70 85-55-70-65 54-55-42-60`} />
      <path d={`M${x - 50} 365h100M${x - 40} 310h80M${x - 29} 245h58M${x - 21} 190h42M${x} 100V47M${x - 43} 113h86`} />
      <rect x={x - 43} y="78" width="14" height="75" rx="4" fill="#1e2719" /><rect x={x + 29} y="78" width="14" height="75" rx="4" fill="#1e2719" />
      <path className="signal-ring" d={`M${x - 32} 58q-22-25 0-50m64 50q22-25 0-50`} stroke="#e2d16b" />
      <path className="signal-ring" d={`M${x - 49} 70q-38-38 0-70m98 70q38-38 0-70`} stroke="#e2d16b" strokeOpacity=".5" />
      <text x={x} y="490" textAnchor="middle" fill="#a9b294" stroke="none" fontFamily="monospace" fontSize="10">{i === 0 ? "TRANSMIT / 01" : "RECEIVE / 02"}</text>
    </g>)}
    <path d="M154 122C325 123 310 164 475 164H505V192" stroke="#080b08" strokeWidth="9" />
    <path d="M154 122C325 123 310 164 475 164H505V192" stroke="#b8bf9a" strokeWidth="3" />
    <path d="M946 122C775 123 790 164 625 164H595V192" stroke="#080b08" strokeWidth="9" />
    <path d="M946 122C775 123 790 164 625 164H595V192" stroke="#b8bf9a" strokeWidth="3" />
    {[505, 595].map(x => <g key={x}><rect x={x - 9} y="169" width="18" height="24" rx="3" fill="#2e3823" stroke="#aeb792" /><rect x={x - 6} y="188" width="12" height="12" rx="2" fill="#d4d2b2" /><path d={`M${x - 3} 191v4m6-4v4`} stroke="#545c44" /></g>)}
  </svg>;
}

function ProjectPreview({ slug }: { slug: string }) {
  const media = PROJECT_MEDIA[slug];
  if (media) return <div className="project-preview"><video controls preload="none" playsInline src={media.src} poster={media.poster} aria-label={`${slug} project recording`} /></div>;
  return <div className="project-preview" aria-label={`Animated schematic preview of ${slug}`} role="img">
    <svg viewBox="0 0 400 160" fill="none" aria-hidden="true">
      {slug === "localflow" ? Array.from({ length: 35 }, (_, i) => <path className="preview-trace" key={i} d={`M${30 + i * 10} ${(80 - (15 + Math.sin(i * 2.2) * 12 + Math.sin(i * .4) * 30)).toFixed(2)}V${(80 + (15 + Math.sin(i * 2.2) * 12 + Math.sin(i * .4) * 30)).toFixed(2)}`} stroke={i > 10 && i < 25 ? "#f58b61" : "#bbc69a"} strokeWidth="4" strokeLinecap="round" />) : slug === "autostabi" ? <g stroke="#bbc69a"><circle cx="200" cy="80" r="62" /><path d="M150 80h100M200 30v100m-30-30 30-20 30 20m-40-50h20m-30 15h40" /><path className="preview-trace" d="M85 105 315 55" stroke="#f58b61" strokeWidth="3" /></g> : slug === "wand-mouse" ? <g strokeWidth="2"><path d="m200 80 100 30M200 80 100 110M200 80V15" stroke="#98bfa5" /><path className="preview-trace" d="M100 100C40-30 340 5 300 100S130 145 100 100Z" stroke="#f58b61" /><circle cx="200" cy="80" r="10" fill="#d1d59d" /></g> : slug === "privaveda" ? <g strokeWidth="2"><path className="preview-trace" d="M20 80c30-160 45 160 75 0s45 100 75 0 45 50 75 0 45 20 75 0h60" stroke="#f58b61" /><path d="M20 80h360" stroke="#99a778" strokeDasharray="3 5" /></g> : <path className="preview-trace" d="M20 110h30V40h20v70h30V40h30v70h30V40h20v70h30V40h45v70h30V40h20v70h30V40h25v70h20" stroke="#e1d685" strokeWidth="2" />}
    </svg><span className="preview-caption">ANIMATED SYSTEM SKETCH / {slug.toUpperCase()}</span>
  </div>;
}

export function TowerGallery() {
  const [selected, setSelected] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const active = useSceneActivity(ref);
  const project = FLAGSHIP_PROJECTS[selected];
  return <section id="work" className="atlas-section scene-motion" ref={ref} data-active={active}>
    <div className="section-heading"><div><p className="chapter-label">03 / Signals from the workbench</p><h2>Built to connect.</h2></div><p>Code, copper and countless iterations.<br />Five projects. Each one a different question.</p></div>
    <div className="tower-stage"><Towers /><div className="suspended-frame"><div className="clip-header"><span>WORKBENCH / {project.number}</span><span>USB CONNECTED ↙</span></div><ProjectPreview key={project.slug} slug={project.slug} /><div className="clip-footer"><strong>{project.title}</strong><Link href={`/work/${project.slug}`} aria-label={`Read the ${project.title} case study`}>EXPLORE ↗</Link></div></div></div>
    <div className="project-selector" role="group" aria-label="Choose a project">{FLAGSHIP_PROJECTS.map((item, i) => <button key={item.slug} aria-pressed={selected === i} aria-controls="selected-project-story" onClick={() => setSelected(i)}><span>0{i + 1}</span>{item.title}</button>)}</div>
    <div id="selected-project-story" className="project-story" aria-live="polite"><div><span className="project-status">{project.status} / {project.year}</span><h3>{project.subtitle}</h3><p>{project.build.description}</p></div><div><p>{project.question}</p><div className="project-tech">{project.build.coreTech.map(tech => <span key={tech}>{tech}</span>)}</div><div className="hero-actions"><Link className="atlas-button" href={`/work/${project.slug}`}>Read case study <ArrowRight size={15} /></Link><a className="atlas-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source code <ArrowUpRight size={15} /></a></div></div></div>
  </section>;
}

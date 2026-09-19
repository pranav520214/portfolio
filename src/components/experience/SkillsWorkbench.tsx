"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Cpu,
  AudioLines,
  Network,
} from "lucide-react";
import { CAPABILITIES } from "@/data/portfolioContent";
import { RevealHeading } from "./RevealHeading";

const categories = [
  {
    name: "Intelligence",
    title: "AI that stays on your machine.",
    mark: "AI",
    icon: AudioLines,
    slug: "localflow",
    project: "LocalFlow",
    file: "speech → inference → text",
  },
  {
    name: "Software",
    title: "The systems behind the interface.",
    mark: "{ }",
    icon: Code2,
    slug: "localflow",
    project: "LocalFlow",
    file: "interface → process → runtime",
  },
  {
    name: "Hardware",
    title: "From a signal to a response.",
    mark: "µC",
    icon: Cpu,
    slug: "autostabi",
    project: "AUTOSTABI",
    file: "sensor → estimate → control",
  },
  {
    name: "Simulation",
    title: "A model you can question.",
    mark: "ƒ(x)",
    icon: Network,
    slug: "privaveda",
    project: "PRIVAVEDA",
    file: "model → solve → validate",
  },
];

export function SkillsWorkbench({ reduced }: { reduced: boolean }) {
  const [selected, setSelected] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const category = categories[selected];
  const skills = CAPABILITIES[selected];
  const Icon = category.icon;

  useEffect(() => {
    if (reduced || !panel.current) return;
    const context = gsap.context(() => {
      gsap.from(".skill-panel-enter", {
        y: 15,
        opacity: 0.25,
        duration: 0.5,
        stagger: 0.055,
        ease: "power2.out",
        clearProps: "all",
      });
    }, panel);
    return () => context.revert();
  }, [selected, reduced]);

  return (
    <section id="capabilities" className="skills-workbench craft-section">
      <div className="workbench-heading" data-reveal>
        <p className="handwriting">Different tools. The same curiosity.</p>
        <RevealHeading>A few ways I build.</RevealHeading>
        <p>
          Pick a discipline. See the tools, the thinking,
          <br className="desktop-break" /> and where I’ve put them to work.
        </p>
      </div>
      <div className="workbench-layout">
        <div
          className="skill-selector"
          role="group"
          aria-label="Choose a skill discipline"
        >
          {categories.map((item, i) => (
            <button
              key={item.name}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              aria-controls="skill-detail"
            >
              <span className="skill-index">0{i + 1}</span>
              <span>{item.name}</span>
              <ArrowUpRight size={24} />
            </button>
          ))}
          <p className="skill-margin-note handwriting">
            The interesting part?
            <br />
            Where these overlap. ↗
          </p>
        </div>
        <div className="skill-stage" data-reveal>
          <div className="skill-sheet-back" aria-hidden="true" />
          <div className="skill-sheet-mid" aria-hidden="true" />
          <div
            className="skill-detail"
            id="skill-detail"
            ref={panel}
            aria-live="polite"
          >
            <div className="skill-panel-top skill-panel-enter">
              <span>FIELD / 0{selected + 1}</span>
              <Icon size={22} strokeWidth={1.4} />
              <span>PRANAV’S TOOLBOX</span>
            </div>
            <div className="skill-panel-title skill-panel-enter">
              <h3>{category.title}</h3>
              <span className="skill-typographic-mark" aria-hidden="true">
                {category.mark}
              </span>
            </div>
            <p className="skill-panel-description skill-panel-enter">
              {skills.description}
            </p>
            <div className="skill-tool-list skill-panel-enter">
              {skills.skills.map((skill, i) => (
                <span key={skill}>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  {skill}
                </span>
              ))}
            </div>
            <div
              className="skill-signal-path skill-panel-enter"
              aria-hidden="true"
            >
              <span>{category.file}</span>
              <i />
            </div>
            <Link
              className="skill-proof-link skill-panel-enter"
              href={`/work/${category.slug}`}
            >
              <span>
                <small>SEE IT IN PRACTICE</small>
                {category.project}
              </span>
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Leaf, Sprout } from "lucide-react";
import { MILESTONES, MilestoneItem } from "@/data/portfolioContent";
import { AccessibleModal } from "../ui/AccessibleModal";
import { PortalLink } from "../portal/PortalLink";

const trees = [
  { name: "Curiosity", detail: "Science & exploration", ids: ["M01", "M02", "M05"], labels: ["STEM-A-THON", "Space Olympiad", "AI for Bharat"] },
  { name: "Craft", detail: "Building & experimenting", ids: ["M03", "M06", "M08"], labels: ["Confluence 2.0", "PromptWars", "Vibe2Ship"] },
  { name: "Community", detail: "Ideas with a purpose", ids: ["M04", "M07"], labels: ["Solve for Tomorrow", "The ₹100 Founder"] },
];

export function AchievementGarden({ reduced = false }: { reduced?: boolean }) {
  const [stage, setStage] = useState<"seed" | "growing" | "grown">("seed");
  const [selected, setSelected] = useState<MilestoneItem | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  function grow() {
    if (stage !== "seed") return;
    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStage("grown"); return; }
    setStage("growing");
    timer.current = setTimeout(() => setStage("grown"), 1800);
  }
  return <section id="milestones" className="garden-section">
    <div className="atlas-section">
      <div className="section-heading"><div><p className="chapter-label">04 / Small steps. Deeper roots.</p><h2>Good things grow.</h2></div><p>Competitions, prototypes and people who helped me along the way. A few branches of the journey so far.</p></div>
      <div className="garden-controls"><button className="atlas-button garden-button" onClick={grow} disabled={stage !== "seed"} aria-controls="achievement-trees" aria-expanded={stage !== "seed"}><Sprout size={17} />{stage === "seed" ? "Grow my achievements" : stage === "growing" ? "Taking root…" : "A little forest of progress"}</button><p role="status">{stage === "grown" ? "Select a leaf to see the original record." : "Every leaf has a story. Every story has a record."}</p></div>
      <div className="garden-trees" id="achievement-trees" data-grown={stage !== "seed"}>
        {trees.map(tree => <article className="achievement-tree" key={tree.name}>
          <div className="tree-diagram">
            <svg viewBox="0 0 320 310" preserveAspectRatio="none" aria-hidden="true">
              <path className="tree-root" d="M160 310v-42m0 23-36 17m36-17 38 18m-38-8-16 9m16-9 10 9" />
              <path className="tree-branch" pathLength="1" d="M160 275V30m0 180c-5-20-38-28-60-50m60 18c10-20 48-27 75-60m-75 5c-5-14-28-24-48-48m48 30c10-15 42-28 55-58" />
            </svg>
            {tree.ids.map((id, i) => <button key={id} className="tree-leaf" tabIndex={stage === "seed" ? -1 : 0} onClick={() => setSelected(MILESTONES.find(item => item.id === id) || null)} aria-label={`View ${tree.labels[i]} certificate`}><Leaf size={14} /><span>{tree.labels[i]}</span><ArrowUpRight size={12} /></button>)}
          </div>
          <h3 className="tree-name">{tree.name}<span>{tree.detail}</span></h3>
        </article>)}
      </div>
      <details className="garden-records"><summary>Browse all {MILESTONES.length} achievement records</summary><div className="record-list">{MILESTONES.map(item => <button key={item.id} onClick={() => setSelected(item)}>{item.title}<span>{item.date} ↗</span></button>)}</div></details>
      <div className="garden-next">{stage === "grown" ? <PortalLink className="atlas-button garden-button" href="/philosophy" label="From the roots to the principles">My Engineering Philosophy <ArrowUpRight size={16} /></PortalLink> : <p>Keep scrolling to the ideas behind the work.</p>}</div>
    </div>
    <AccessibleModal isOpen={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.proofTitle || "Achievement record"}>
      {selected && <div className="p-5 sm:p-8 space-y-4"><p className="text-sm text-[#c5cbb5]">{selected.date} · {selected.organizer}</p><p>{selected.outcome}</p><p className="text-sm text-[#b0baa0]">{selected.highlight}</p>{selected.proofImage && <><Image src={selected.proofImage} alt={selected.proofTitle || selected.title} width={1000} height={750} sizes="(max-width: 768px) 90vw, 800px" className="w-full max-h-[60vh] object-contain" /><a href={selected.proofImage} target="_blank" rel="noopener noreferrer" className="atlas-link">Open full-size record <ArrowUpRight size={14} /></a></>}</div>}
    </AccessibleModal>
  </section>;
}

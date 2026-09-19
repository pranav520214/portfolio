"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import { SkillsWorkbench } from "./SkillsWorkbench";
import { useCraftMotion } from "./CraftMotion";
import { StudioNav } from "./StudioNav";
import { IntroPortrait } from "./IntroPortrait";
import { ScrollAssembly } from "./ScrollAssembly";
import { TowerGallery } from "../projects/TowerGallery";
import { AchievementGarden } from "../achievements/AchievementGarden";
import { PhilosophyBridge } from "./PhilosophyBridge";
import { StudioIndex } from "./StudioIndex";
import { AtlasContact } from "../contact/AtlasContact";
import { useMotionPreference } from "./useMotionPreference";

const TerminalModal = dynamic(
  () => import("../terminal/TerminalModal").then((m) => m.TerminalModal),
  { ssr: false },
);

export function PortfolioExperience({
  notes,
}: {
  notes: { slug: string; title: string }[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState(false);
  const { reduced, toggle, ready } = useMotionPreference();
  useCraftMotion(root, reduced || !ready);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("input,textarea,[contenteditable=true]")) return;
      if (event.key === "`" || event.key === "~") {
        event.preventDefault();
        setTerminal((value) => !value);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  function navigate(id: string) {
    const aliases: Record<string, string> = {
      projects: "work",
      archive: "work",
      approach: "philosophy",
      achievements: "milestones",
      timeline: "milestones",
      notes: "notebook",
      research: "notebook",
      questions: "notebook",
      about: "hero",
      vision: "philosophy",
      skills: "capabilities",
      stack: "capabilities",
      email: "contact",
    };
    document
      .getElementById(aliases[id] || id)
      ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  }
  return (
    <MotionConfig reducedMotion={reduced ? "always" : "user"}>
      <div ref={root} className="studio" data-reduced-motion={reduced}>
        <a className="skip-content" href="#hero">
          Skip to introduction
        </a>
        <StudioNav
          onTerminal={() => setTerminal(true)}
          reduced={reduced}
          onMotion={toggle}
        />
        <main>
          <IntroPortrait />
          <SkillsWorkbench reduced={reduced} />
          <ScrollAssembly motionReduced={reduced} />
          <TowerGallery />
          <AchievementGarden reduced={reduced} />
          <PhilosophyBridge />
          <StudioIndex notes={notes} />
          <AtlasContact />
        </main>
        {terminal && (
          <TerminalModal
            isOpen={terminal}
            onClose={() => setTerminal(false)}
            onNavigate={navigate}
          />
        )}
      </div>
    </MotionConfig>
  );
}

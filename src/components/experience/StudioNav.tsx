"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Volume2, VolumeX, Terminal, Pause, Play } from "lucide-react";
import { NamasteMark } from "../intro/NamasteMark";
import { sounds } from "../audio/SoundSystem";

const links = [
  { id: "hero", label: "INTRODUCTION" },
  { id: "capabilities", label: "SKILLS" },
  { id: "work", label: "WORK" },
  { id: "milestones", label: "ACHIEVEMENTS" },
  { id: "philosophy", label: "PHILOSOPHY" },
  { id: "contact", label: "CONTACT" },
];

export function StudioNav({
  onTerminal,
  reduced,
  onMotion,
}: {
  onTerminal: () => void;
  reduced: boolean;
  onMotion: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    setMuted(sounds.getMuted());
  }, []);
  return (
    <header
      className="studio-nav"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <div className="studio-nav-inner">
        <Link
          href="/"
          className="studio-brand"
          aria-label="Pranav Games — return to the constellations"
        >
          <NamasteMark /> PRANAV / GAMES
        </Link>
        <nav aria-label="Portfolio sections">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="studio-controls">
          <button
            onClick={onMotion}
            aria-label={reduced ? "Enable motion" : "Reduce motion"}
            aria-pressed={reduced}
          >
            {reduced ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <button
            onClick={() => setMuted(sounds.toggleMute())}
            aria-label={muted ? "Enable sound" : "Mute sound"}
            aria-pressed={!muted}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            className="studio-terminal-toggle"
            onClick={onTerminal}
            aria-label="Open command terminal"
          >
            <Terminal size={16} />
          </button>
          <button
            className="studio-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="studio-mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="studio-mobile-menu"
          className="studio-mobile-menu"
          aria-label="Mobile portfolio sections"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

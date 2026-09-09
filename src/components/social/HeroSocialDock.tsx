"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Github, ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/portfolioData";
import { sounds } from "../audio/SoundSystem";

// Official X / Twitter SVG Logo
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function HeroSocialDock() {
  const items = [
    {
      ...SOCIAL_LINKS.linkedin,
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      ...SOCIAL_LINKS.x,
      icon: XIcon,
      label: "X",
    },
    {
      ...SOCIAL_LINKS.instagram,
      icon: Instagram,
      label: "Instagram",
    },
    {
      ...SOCIAL_LINKS.github,
      icon: Github,
      label: "GitHub",
    },
  ];

  return (
    <aside
      aria-label="Social Profiles Navigation"
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 select-none"
    >
      {/* Decorative Blueprint Coordinate Notch */}
      <div className="font-mono text-[9px] text-comic-yellow/60 tracking-widest uppercase rotate-180 [writing-mode:vertical-rl] mb-1">
        NETWORK //
      </div>

      {/* Glass Blueprint Dock Container */}
      <div className="bg-blueprint-950/85 border border-comic-yellow/30 hover:border-comic-yellow/60 rounded-2xl p-2 shadow-comic backdrop-blur-md flex flex-col gap-2 transition-colors">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              data-cursor="contact"
              onClick={() => sounds.playClick()}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group p-2.5 rounded-xl text-technical-cream/70 hover:text-comic-yellow hover:bg-blueprint-900 border border-transparent hover:border-comic-yellow/40 transition-all flex items-center justify-center"
            >
              <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />

              {/* Tooltip on Desktop Hover */}
              <div className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-blueprint-900/95 border border-comic-yellow/50 shadow-comic font-mono text-xs text-technical-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 flex items-center gap-1.5 z-50">
                <span className="font-bold text-comic-yellow">{item.label}</span>
                <span className="text-[10px] text-technical-muted">{item.handle}</span>
                <ArrowUpRight className="w-3 h-3 text-comic-yellow" />
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Connecting Vertical Line */}
      <div className="w-[1px] h-8 bg-gradient-to-b from-comic-yellow/40 to-transparent" />
    </aside>
  );
}

// Mobile Contextual Social Bar
export function MobileSocialBar() {
  const items = [
    {
      ...SOCIAL_LINKS.linkedin,
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      ...SOCIAL_LINKS.x,
      icon: XIcon,
      label: "X",
    },
    {
      ...SOCIAL_LINKS.instagram,
      icon: Instagram,
      label: "Instagram",
    },
    {
      ...SOCIAL_LINKS.github,
      icon: Github,
      label: "GitHub",
    },
  ];

  return (
    <div className="lg:hidden flex items-center justify-center gap-2 pt-4 pb-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
            onClick={() => sounds.playClick()}
            className="p-2.5 rounded-lg bg-blueprint-900/90 border border-comic-yellow/30 text-technical-cream hover:text-comic-yellow transition-colors flex items-center gap-1.5 font-mono text-xs"
          >
            <Icon className="w-4 h-4" />
            <span className="text-[11px] font-bold">{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}

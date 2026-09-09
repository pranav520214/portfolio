"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Volume2, VolumeX, Menu, X, Cpu, Github, ExternalLink } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolioData";

interface NavbarProps {
  onOpenTerminal: () => void;
  onNavigate: (id: string) => void;
  activeSection: string;
}

export function Navbar({ onOpenTerminal, onNavigate, activeSection }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    setIsMuted(sounds.getMuted());
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { id: "hero", label: "01 HERO" },
    { id: "about", label: "02 PROFILE" },
    { id: "brain", label: "03 BRAIN" },
    { id: "projects", label: "04 BUILDS" },
    { id: "hardware", label: "05 AVIONICS" },
    { id: "toolbox", label: "06 TOOLBOX" },
    { id: "achievements", label: "07 LOG" },
    { id: "contact", label: "08 CONTACT" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blueprint-950/85 backdrop-blur-md border-b border-comic-yellow/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate("hero");
            }}
            className="flex items-center gap-2 group"
          >
            <span className="font-black text-xl tracking-tight text-comic-yellow group-hover:scale-105 transition-transform drop-shadow-[0_1px_8px_rgba(255,230,0,0.4)]">
              PRANAV
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] text-technical-cream/70 bg-blueprint-900 border border-comic-yellow/25 px-1.5 py-0.5 rounded">
              AI × CS × SYSTEMS
            </span>
          </button>

          {/* Telemetry Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SYS_ONLINE
            <span className="text-technical-muted ml-1">{timeString}</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  sounds.playClick();
                  onNavigate(link.id);
                }}
                className={`font-mono text-xs px-2.5 py-1 rounded transition-all duration-150 ${
                  isActive
                    ? "bg-comic-yellow text-blueprint-950 font-bold shadow-comic"
                    : "text-technical-cream/80 hover:text-comic-yellow hover:bg-blueprint-900/60"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls (Terminal, Sound, GitHub, Mobile Menu) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            aria-label="Toggle Audio"
            title={isMuted ? "Unmute Procedural Audio" : "Mute Audio"}
            className="flex items-center gap-1.5 font-mono text-xs text-technical-cream/80 hover:text-comic-yellow bg-blueprint-900/60 hover:bg-blueprint-850 border border-comic-yellow/25 px-2.5 py-1 rounded transition-colors"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-technical-muted" />
                <span className="hidden sm:inline text-[10px]">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-comic-yellow animate-pulse" />
                <span className="hidden sm:inline text-[10px] text-comic-yellow font-bold">AUDIO</span>
              </>
            )}
          </button>

          {/* Terminal Launcher Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 font-mono text-xs text-comic-yellow hover:bg-comic-yellow hover:text-blueprint-950 border border-comic-yellow/50 px-2.5 py-1 rounded transition-all duration-200 shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">CLI [~]</span>
          </button>

          {/* Social Profiles Desktop Links */}
          <div className="hidden md:flex items-center gap-1 pl-1 border-l border-comic-yellow/20">
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LINKS.linkedin.ariaLabel}
              data-cursor="contact"
              className="text-technical-cream/70 hover:text-comic-yellow p-1.5 transition-colors"
              title="LinkedIn Profile"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.07v8.37h2.78z" />
              </svg>
            </a>

            <a
              href={SOCIAL_LINKS.x.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LINKS.x.ariaLabel}
              data-cursor="contact"
              className="text-technical-cream/70 hover:text-comic-yellow p-1.5 transition-colors"
              title="X / Twitter"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LINKS.instagram.ariaLabel}
              data-cursor="contact"
              className="text-technical-cream/70 hover:text-comic-yellow p-1.5 transition-colors"
              title="Instagram Profile"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LINKS.github.ariaLabel}
              data-cursor="code"
              className="text-technical-cream/70 hover:text-comic-yellow p-1.5 transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-technical-cream/80 hover:text-comic-yellow p-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-blueprint-950 border-b border-comic-yellow/30 px-4 py-3 space-y-1 font-mono text-xs">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                sounds.playClick();
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded ${
                activeSection === link.id
                  ? "bg-comic-yellow text-blueprint-950 font-bold"
                  : "text-technical-cream hover:text-comic-yellow hover:bg-blueprint-900"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

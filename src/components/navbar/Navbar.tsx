"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { SOCIAL_LINKS } from "@/data/portfolioContent";

interface NavbarProps {
  onOpenTerminal: () => void;
  onNavigate: (id: string) => void;
  activeSection: string;
}

export function Navbar({ onOpenTerminal, onNavigate, activeSection }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMuted(sounds.getMuted());
  }, []);

  const handleSoundToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { id: "work", label: "WORK" },
    { id: "about", label: "ABOUT" },
    { id: "capabilities", label: "CAPABILITIES" },
    { id: "research", label: "RESEARCH" },
    { id: "privantrix", label: "PRIVANTRIX" },
    { id: "vision", label: "VISION" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070708]/85 backdrop-blur-md border-b border-white/10 text-[#f2f2ed] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand / Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate("hero");
            }}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff5a36] shadow-[0_0_8px_#ff5a36]" />
            <span className="font-sans font-bold text-sm tracking-tight text-[#f2f2ed] group-hover:text-[#ff5a36] transition-colors">
              PRANAV KUMAR MISHRA
            </span>
          </button>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  sounds.playClick();
                  onNavigate(link.id);
                }}
                className={`text-xs font-mono tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#111318] text-[#ff5a36] font-bold border border-[#ff5a36]/30 shadow-sm"
                    : "text-[#a5acb8] hover:text-[#f2f2ed] hover:bg-[#111318]/60"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls, Audio & CLI */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle */}
          <button
            onClick={handleSoundToggle}
            aria-label="Toggle Audio"
            title={isMuted ? "Unmute Sound Feedback" : "Mute Sound"}
            className="flex items-center gap-1 font-mono text-xs text-[#a5acb8] hover:text-[#f2f2ed] p-2 rounded-lg hover:bg-[#111318] border border-transparent hover:border-white/10 transition-all cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[#6b7280]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#35d9ff]" />
            )}
          </button>

          {/* Terminal Launcher Trigger */}
          <button
            onClick={() => {
              sounds.playKey();
              onOpenTerminal();
            }}
            className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] border border-white/10 text-[#a5acb8] hover:border-[#ff5a36]/60 hover:text-[#f2f2ed] bg-[#0d0e11] hover:bg-[#111318] px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            title="Open CLI Terminal (~)"
          >
            <Terminal className="w-3.5 h-3.5 text-[#35d9ff]" />
            <span>CLI [~]</span>
          </button>

          {/* GitHub Outbound */}
          <a
            href={SOCIAL_LINKS.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#f2f2ed] hover:text-[#ff5a36] bg-[#111318] border border-white/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <span>GITHUB</span>
            <ArrowUpRight className="w-3 h-3 text-[#a5acb8]" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#f2f2ed] p-2 rounded-lg hover:bg-[#111318]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0e11] border-b border-white/10 px-4 py-4 space-y-2 font-mono">
          <div className="text-[10px] text-[#6b7280] font-bold uppercase tracking-wider pb-1 px-3">
            NAVIGATION //
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                sounds.playClick();
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-xs rounded-lg font-medium transition-colors ${
                activeSection === link.id
                  ? "bg-[#111318] text-[#ff5a36] border border-[#ff5a36]/30"
                  : "text-[#a5acb8] hover:bg-[#111318] hover:text-[#f2f2ed]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between px-3">
            <button
              onClick={() => {
                sounds.playKey();
                onOpenTerminal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs text-[#35d9ff]"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI [~]</span>
            </button>
            <a
              href="mailto:mpranav126@outlook.com"
              className="text-xs text-[#ff5a36] hover:underline"
            >
              mpranav126@outlook.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}



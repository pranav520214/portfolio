"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Volume2, VolumeX, Menu, X, ExternalLink } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { SOCIAL_LINKS } from "@/data/portfolioData";

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
    { id: "work", label: "Work" },
    { id: "questions", label: "Questions" },
    { id: "notebook", label: "Notebook" },
    { id: "about", label: "About" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F4EF]/95 backdrop-blur-md border-b border-[#D8D6CD] text-[#111111] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate("hero");
            }}
            className="flex items-center gap-2 group text-left"
          >
            <span className="font-bold text-lg tracking-tight text-[#111111] group-hover:text-[#D94431] transition-colors">
              PRANAV
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] text-[#666666] border-l border-[#D8D6CD] pl-2">
              Engineering Laboratory
            </span>
          </button>
        </div>

        {/* Center: Clean Editorial Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  sounds.playClick();
                  onNavigate(link.id);
                }}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? "bg-[#111111] text-[#F5F4EF]"
                    : "text-[#555555] hover:text-[#111111] hover:bg-[#EAE8DF]"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls & External Link */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle */}
          <button
            onClick={handleSoundToggle}
            aria-label="Toggle Audio"
            title={isMuted ? "Unmute Procedural Audio" : "Mute Audio"}
            className="flex items-center gap-1 font-mono text-xs text-[#666666] hover:text-[#111111] p-1.5 rounded hover:bg-[#EAE8DF] transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#D94431]" />
            )}
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenTerminal();
            }}
            className="hidden sm:flex items-center gap-1.5 font-mono text-xs border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F5F4EF] px-2 py-1 rounded transition-colors"
          >
            <Terminal className="w-3 h-3" />
            <span>CLI [~]</span>
          </button>

          {/* GitHub External */}
          <a
            href={SOCIAL_LINKS.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-[#111111] hover:text-[#D94431] px-2 py-1 transition-colors"
          >
            <span>GitHub ↗</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#111111] p-1.5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F4EF] border-b border-[#D8D6CD] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                sounds.playClick();
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm rounded font-medium ${
                activeSection === link.id
                  ? "bg-[#111111] text-[#F5F4EF]"
                  : "text-[#555555] hover:bg-[#EAE8DF] hover:text-[#111111]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenTerminal();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-mono text-[#D94431]"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch CLI Terminal [~]</span>
          </button>
        </div>
      )}
    </header>
  );
}

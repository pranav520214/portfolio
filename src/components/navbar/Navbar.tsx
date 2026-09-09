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
    { id: "approach", label: "Approach" },
    { id: "capabilities", label: "Capabilities" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0F12]/90 backdrop-blur-md border-b border-[#262E3B] text-[#F1F5F9] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate("hero");
            }}
            className="flex items-center gap-2.5 group text-left"
          >
            <span className="font-bold text-lg tracking-tight text-[#F1F5F9] group-hover:text-[#F59E0B] transition-colors">
              PRANAV
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] text-[#94A3B8] border-l border-[#262E3B] pl-2.5">
              AI × Systems × Hardware
            </span>
          </button>
        </div>

        {/* Center: Clean Section Navigation */}
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
                    ? "bg-[#1C212B] text-[#F59E0B] font-semibold border border-[#262E3B]"
                    : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#14171E]"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls & GitHub */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle */}
          <button
            onClick={handleSoundToggle}
            aria-label="Toggle Audio"
            title={isMuted ? "Unmute Procedural Audio" : "Mute Audio"}
            className="flex items-center gap-1 font-mono text-xs text-[#94A3B8] hover:text-[#F1F5F9] p-1.5 rounded hover:bg-[#1C212B] transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#F59E0B]" />
            )}
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenTerminal();
            }}
            className="hidden sm:flex items-center gap-1.5 font-mono text-xs border border-[#262E3B] text-[#94A3B8] hover:border-[#F59E0B] hover:text-[#F1F5F9] hover:bg-[#14171E] px-2.5 py-1 rounded transition-colors"
          >
            <Terminal className="w-3 h-3 text-[#F59E0B]" />
            <span>CLI [~]</span>
          </button>

          {/* GitHub Link */}
          <a
            href={SOCIAL_LINKS.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-[#F1F5F9] hover:text-[#F59E0B] px-2 py-1 transition-colors"
          >
            <span>GitHub ↗</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F1F5F9] p-1.5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#14171E] border-b border-[#262E3B] px-4 py-3 space-y-1">
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
                  ? "bg-[#1C212B] text-[#F59E0B]"
                  : "text-[#94A3B8] hover:bg-[#1C212B] hover:text-[#F1F5F9]"
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
            className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-mono text-[#F59E0B]"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch CLI Terminal [~]</span>
          </button>
        </div>
      )}
    </header>
  );
}

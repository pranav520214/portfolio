"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, CornerDownLeft, ShieldCheck } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { FEATURED_PROJECTS, ACHIEVEMENTS, SOCIAL_LINKS } from "@/data/portfolioData";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export function TerminalModal({ isOpen, onClose, onNavigate }: TerminalModalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: "cmd" | "resp" | "err" | "secret"; text: string }[]>([
    { type: "resp", text: "PRANAV // WORKSTATION TERMINAL v2.4" },
    { type: "resp", text: "Type 'help' to inspect available system commands." }
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    sounds.playKey();

    setHistory((prev) => [...prev, { type: "cmd", text: `> ${cmd}` }]);
    setInput("");

    if (!trimmed) return;

    switch (trimmed) {
      case "help":
        setHistory((prev) => [
          ...prev,
          {
            type: "resp",
            text: `AVAILABLE COMMANDS:
• help           - List available terminal operations
• about          - Learn about Pranav and multidisciplinary focus
• projects       - List top research and engineering builds
• research       - Deep dive on ISEF ASR & Rudra Sentinel
• skills / stack - Inspect engineering tools and languages
• achievements   - Print verified competitions and mission logs
• socials        - Display all online channels & handles
• linkedin       - Open LinkedIn profile in new tab
• x / twitter    - Open X profile in new tab
• instagram      - Open Instagram profile in new tab
• github         - Open GitHub repository in new tab
• contact        - Jump to communication dispatch
• boot           - Rerun workstation boot diagnostic
• secret         - Unlock experimental prototype sketch
• clear          - Clear terminal display buffer
• exit / close   - Close terminal window`
          }
        ]);
        break;

      case "about":
        onNavigate("about");
        setHistory((prev) => [
          ...prev,
          {
            type: "resp",
            text: "Navigating to About. Class XI student in Punjab, India, building at the intersection of AI, low-level systems, avionics, and aerospace."
          }
        ]);
        break;

      case "projects":
        onNavigate("work");
        setHistory((prev) => [
          ...prev,
          {
            type: "resp",
            text: `LAUNCHING ENGINEERING MODULES:\n${FEATURED_PROJECTS.map(
              (p, idx) => `[0${idx + 1}] ${p.title} (${p.status})`
            ).join("\n")}`
          }
        ]);
        break;

      case "research":
        onNavigate("work");
        setHistory((prev) => [
          ...prev,
          {
            type: "resp",
            text: `CURRENT ACTIVE RESEARCH:\n1. Compact Multilingual ASR Small Language Model\n2. Rudra Sentinel — Verification-First Software Assurance (Technical review: Vidyut Sriram / Penn State)`
          }
        ]);
        break;

      case "skills":
      case "stack":
        onNavigate("toolbox");
        setHistory((prev) => [
          ...prev,
          {
            type: "resp",
            text: "Navigating to 3D Tech Constellation. Languages: Python, C++, Rust, TypeScript. Hardware: ESP32, MPU6500, Kalman Filter. AI: PyTorch, Hugging Face, whisper.cpp, llama.cpp."
          }
        ]);
        break;

      case "achievements":
      case "log":
        onNavigate("achievements");
        setHistory((prev) => [
          ...prev,
          {
            type: "resp",
            text: `PRINTING MISSION LOGS:\n${ACHIEVEMENTS.slice(0, 5).map(
              (a) => `• ${a.code}: ${a.title} (${a.organizer})`
            ).join("\n")}\n[+ ${ACHIEVEMENTS.length - 5} more verified records loaded in log]`
          }
        ]);
        break;

      case "socials":
        setHistory((prev) => [
          ...prev,
          {
            type: "resp",
            text: `ONLINE PRESENCE //
• LinkedIn:  ${SOCIAL_LINKS.linkedin.url}
• X:         ${SOCIAL_LINKS.x.url}
• Instagram: ${SOCIAL_LINKS.instagram.url}
• GitHub:    ${SOCIAL_LINKS.github.url}`
          }
        ]);
        break;

      case "linkedin":
        window.open(SOCIAL_LINKS.linkedin.url, "_blank");
        setHistory((prev) => [
          ...prev,
          { type: "resp", text: `Opening LinkedIn profile (${SOCIAL_LINKS.linkedin.handle})...` }
        ]);
        break;

      case "x":
      case "twitter":
        window.open(SOCIAL_LINKS.x.url, "_blank");
        setHistory((prev) => [
          ...prev,
          { type: "resp", text: `Opening X profile (${SOCIAL_LINKS.x.handle})...` }
        ]);
        break;

      case "instagram":
      case "ig":
        window.open(SOCIAL_LINKS.instagram.url, "_blank");
        setHistory((prev) => [
          ...prev,
          { type: "resp", text: `Opening Instagram profile (${SOCIAL_LINKS.instagram.handle})...` }
        ]);
        break;

      case "github":
        window.open(SOCIAL_LINKS.github.url, "_blank");
        setHistory((prev) => [
          ...prev,
          { type: "resp", text: `Opening GitHub profile (${SOCIAL_LINKS.github.handle})...` }
        ]);
        break;

      case "contact":
        onNavigate("contact");
        setHistory((prev) => [
          ...prev,
          { type: "resp", text: "Navigating to Command Center Dispatch..." }
        ]);
        break;

      case "secret":
        sounds.playTargetLock();
        setHistory((prev) => [
          ...prev,
          {
            type: "secret",
            text: `★ EASTER EGG: BUILD MODE ACTIVATED ★
"Human ideas + AI = bigger possibilities."
Formula: ∇ × B = μ₀J + μ₀ε₀(∂E/∂t)  [Maxwell-Ampère Law]
Current Status: 100% Engineering Passion · Continuous Iteration.`
          }
        ]);
        break;

      case "clear":
        setHistory([]);
        break;

      case "exit":
      case "close":
      case "quit":
        onClose();
        break;

      default:
        setHistory((prev) => [
          ...prev,
          {
            type: "err",
            text: `Command not recognized: '${trimmed}'. Type 'help' for available commands.`
          }
        ]);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "Escape") {
      onClose();
    } else {
      sounds.playKey();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99998] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl bg-blueprint-950 border-2 border-comic-yellow/70 rounded-lg shadow-comic-lg overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Terminal Header */}
            <div className="bg-blueprint-900 border-b border-comic-yellow/30 px-4 py-2.5 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-comic-yellow" />
                <span className="font-mono text-xs font-bold text-technical-white tracking-widest uppercase">
                  PRANAV_CLI // SHELL ACCESS [~]
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-comic-yellow/60 uppercase">
                  STATUS: SECURE
                </span>
                <button
                  onClick={() => {
                    sounds.playClick();
                    onClose();
                  }}
                  className="text-technical-cream/60 hover:text-comic-yellow p-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs space-y-2 bg-blueprint-950 text-technical-cream/90 selection:bg-comic-yellow selection:text-blueprint-950">
              {history.map((item, i) => (
                <div key={i} className="leading-relaxed whitespace-pre-wrap">
                  {item.type === "cmd" && (
                    <span className="text-comic-yellow font-bold">{item.text}</span>
                  )}
                  {item.type === "resp" && (
                    <span className="text-technical-cream/90">{item.text}</span>
                  )}
                  {item.type === "err" && (
                    <span className="text-red-400 font-semibold">{item.text}</span>
                  )}
                  {item.type === "secret" && (
                    <span className="text-emerald-400 font-bold bg-emerald-950/40 p-2 block border border-emerald-500/30 rounded">
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Line */}
            <div className="p-3 bg-blueprint-900/90 border-t border-comic-yellow/30 flex items-center gap-2">
              <span className="font-mono text-xs text-comic-yellow font-black select-none">
                pranav@system:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type command (e.g. 'projects', 'help', 'secret')..."
                className="flex-1 bg-transparent font-mono text-xs text-technical-white placeholder-technical-muted/50 focus:outline-none"
              />
              <button
                onClick={() => handleCommand(input)}
                className="text-comic-yellow hover:text-white transition-colors"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

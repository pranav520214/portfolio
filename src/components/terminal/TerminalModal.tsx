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
    { type: "resp", text: "PRANAV // WORKSTATION TERMINAL v3.0" },
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
• projects       - List 5 verified engineering projects
• approach       - Inspect 5-stage engineering methodology
• skills / stack - Inspect verified technical capabilities
• achievements   - Print verified competitions and milestones
• socials        - Display verified online handles
• linkedin       - Open LinkedIn profile in new tab
• x / twitter    - Open X profile in new tab
• instagram      - Open Instagram profile in new tab
• github         - Open GitHub repository in new tab
• contact        - Jump to communication dispatch
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
            text: "Navigating to About. Student engineer building at the intersection of artificial intelligence, software and engineering systems."
          }
        ]);
        break;

      case "projects":
        onNavigate("work");
        setHistory((prev) => [
          ...prev,
          {
            type: "resp",
            text: `05 VERIFIED PUBLIC PROJECTS:\n${FEATURED_PROJECTS.map(
              (p, idx) => `[0${idx + 1}] ${p.title} (${p.status})`
            ).join("\n")}`
          }
        ]);
        break;

      case "approach":
        onNavigate("approach");
        setHistory((prev) => [
          ...prev,
          {
            type: "resp",
            text: "ENGINEERING APPROACH:\nIDEA → ARCHITECT → BUILD → BREAK → ITERATE"
          }
        ]);
        break;

      case "skills":
      case "stack":
        onNavigate("capabilities");
        setHistory((prev) => [
          ...prev,
          {
            type: "resp",
            text: "VERIFIED CAPABILITIES:\n1. Local AI (NeMo-Speech.cpp, llama.cpp, streaming ASR, prompt pipelines)\n2. Desktop Systems (Electron, C++, Windows API, process isolation, loopback IPC)\n3. Embedded Engineering (ESP32, MPU6500, FreeRTOS, BLE HID, IBus/PPM)\n4. Simulation (SciPy solve_ivp, Pint, Bayesian calibration, Monte Carlo)"
          }
        ]);
        break;

      case "achievements":
      case "log":
        setHistory((prev) => [
          ...prev,
          {
            type: "resp",
            text: `VERIFIED MILESTONES:\n${ACHIEVEMENTS.map(
              (a) => `• ${a.code}: ${a.title} (${a.organizer})`
            ).join("\n")}`
          }
        ]);
        break;

      case "socials":
        setHistory((prev) => [
          ...prev,
          {
            type: "resp",
            text: `ONLINE PROFILES //
• GitHub:    ${SOCIAL_LINKS.github.url}
• LinkedIn:  ${SOCIAL_LINKS.linkedin.url}
• X:         ${SOCIAL_LINKS.x.url}
• Instagram: ${SOCIAL_LINKS.instagram.url}`
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
          { type: "resp", text: "Navigating to Communication Dispatch..." }
        ]);
        break;

      case "secret":
        sounds.playTargetLock();
        setHistory((prev) => [
          ...prev,
          {
            type: "secret",
            text: `★ EASTER EGG: FIRST-PRINCIPLES BUILD MODE ACTIVATED ★
"I build at the intersection of artificial intelligence, software and engineering systems."
Status: 5 Verified Repositories • 100% Offline AI Inference • Active Prototyping.`
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
        <div className="fixed inset-0 z-[99998] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl bg-[#0D0F12] border border-[#262E3B] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Terminal Header */}
            <div className="bg-[#14171E] border-b border-[#262E3B] px-4 py-2.5 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-[#F59E0B]" />
                <span className="font-mono text-xs font-bold text-[#F1F5F9] tracking-widest uppercase">
                  PRANAV_CLI // WORKSTATION SHELL [~]
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-[#64748B] uppercase">
                  ACTIVE
                </span>
                <button
                  onClick={() => {
                    sounds.playClick();
                    onClose();
                  }}
                  className="text-[#94A3B8] hover:text-[#F59E0B] p-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs space-y-2 bg-[#0D0F12] text-[#F1F5F9]/90 selection:bg-[#F59E0B] selection:text-[#0D0F12]">
              {history.map((item, i) => (
                <div key={i} className="leading-relaxed whitespace-pre-wrap">
                  {item.type === "cmd" && (
                    <span className="text-[#F59E0B] font-bold">{item.text}</span>
                  )}
                  {item.type === "resp" && (
                    <span className="text-[#94A3B8]">{item.text}</span>
                  )}
                  {item.type === "err" && (
                    <span className="text-red-400 font-semibold">{item.text}</span>
                  )}
                  {item.type === "secret" && (
                    <span className="text-amber-300 font-bold bg-amber-950/30 p-2.5 block border border-amber-800/50 rounded-lg">
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Line */}
            <div className="p-3 bg-[#14171E] border-t border-[#262E3B] flex items-center gap-2">
              <span className="font-mono text-xs text-[#F59E0B] font-black select-none">
                pranav@system:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type command (e.g. 'projects', 'skills', 'help')..."
                className="flex-1 bg-transparent font-mono text-xs text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none"
              />
              <button
                onClick={() => handleCommand(input)}
                className="text-[#F59E0B] hover:text-white transition-colors"
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

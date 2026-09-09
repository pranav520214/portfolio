"use client";

import React, { useState } from "react";
import { Send, Github, Mail, Linkedin, Instagram, Sparkles, CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolioData";
import { sounds } from "../audio/SoundSystem";

// Official X SVG Icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", topic: "Research Collaboration", message: "" });
  const [sent, setSent] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playTargetLock();
    const subject = encodeURIComponent(`[Portfolio Dispatch] ${formData.topic} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.topic}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const socialCards = [
    {
      ...SOCIAL_LINKS.linkedin,
      icon: Linkedin,
      sublabel: "Professional Engineering Profile",
    },
    {
      ...SOCIAL_LINKS.x,
      icon: XIcon,
      sublabel: "Technical Thoughts & Experiments",
    },
    {
      ...SOCIAL_LINKS.instagram,
      icon: Instagram,
      sublabel: "Visual Projects & Behind-the-Scenes",
    },
    {
      ...SOCIAL_LINKS.github,
      icon: Github,
      sublabel: "Production Codebases & Schematics",
    },
  ];

  return (
    <section id="contact" className="relative pt-28 pb-12 px-4 sm:px-6 max-w-7xl mx-auto z-20">
      {/* Visual Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-comic-yellow bg-blueprint-900/80 border border-comic-yellow/30 px-3 py-1 rounded mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>08 // COMMAND CENTER FINALE</span>
        </div>
        <h2 className="text-4xl sm:text-7xl font-black text-technical-white tracking-tight">
          HAVE A DIFFICULT PROBLEM?
        </h2>
        <div className="text-4xl sm:text-7xl font-black text-comic-yellow tracking-tight mt-1 drop-shadow-[4px_4px_0px_#000000]">
          LET&apos;S BUILD IT.
        </div>
        <p className="mt-4 text-base sm:text-lg text-technical-cream/80 max-w-2xl mx-auto leading-relaxed">
          Whether you are a university researcher, mentor, engineering judge, or builder looking to collaborate 
          on compact AI, avionics, or hardware systems—my transmission lines are open.
        </p>
      </div>

      {/* Main Grid: Interactive Connect Station & Direct Dispatcher */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto mb-20">
        
        {/* Left Side: CONNECT // PRANAV Interactive Channels */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-comic-yellow/30 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-comic-yellow animate-ping" />
              <span className="font-mono text-xs font-bold text-comic-yellow uppercase tracking-wider">
                CONNECT // PRANAV
              </span>
            </div>
            <span className="font-mono text-[10px] text-technical-cream/60 uppercase">
              {hoveredSocial ? `LINKING TO ${hoveredSocial.toUpperCase()}` : "SELECT CHANNEL"}
            </span>
          </div>

          <div className="space-y-3">
            {socialCards.map((item) => {
              const Icon = item.icon;
              const isHovered = hoveredSocial === item.id;
              const isDimmed = hoveredSocial !== null && !isHovered;

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  data-cursor="contact"
                  onMouseEnter={() => {
                    sounds.playKey();
                    setHoveredSocial(item.id);
                  }}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className={`group relative p-4 rounded-xl border-2 transition-all duration-200 block shadow-comic ${
                    isHovered
                      ? "bg-blueprint-850 border-comic-yellow shadow-comic-lg scale-[1.02] z-10"
                      : isDimmed
                      ? "bg-blueprint-950/70 border-comic-yellow/20 opacity-60"
                      : "bg-blueprint-900/80 border-comic-yellow/35 hover:border-comic-yellow"
                  }`}
                >
                  {/* Dynamic connecting line indicator on hover */}
                  {isHovered && (
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-comic-yellow rounded-full shadow-[0_0_8px_#ffe600]" />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blueprint-950 border border-comic-yellow/30 text-comic-yellow group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-technical-white group-hover:text-comic-yellow transition-colors flex items-center gap-2">
                          <span>{item.name}</span>
                          <span className="font-mono text-[10px] text-technical-muted font-normal">{item.handle}</span>
                        </div>
                        <div className="font-mono text-[11px] text-comic-yellow/90 mt-0.5 font-medium">
                          {item.tagline}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-comic-yellow opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </a>
              );
            })}

            {/* Direct Email Card */}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onClick={() => sounds.playClick()}
              data-cursor="contact"
              onMouseEnter={() => setHoveredSocial("email")}
              onMouseLeave={() => setHoveredSocial(null)}
              className="group p-4 rounded-xl border-2 border-comic-yellow/35 hover:border-comic-yellow bg-blueprint-900/80 hover:bg-blueprint-850 transition-all block shadow-comic"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blueprint-950 border border-comic-yellow/30 text-comic-yellow group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-technical-white group-hover:text-comic-yellow transition-colors">
                      Direct Email
                    </div>
                    <div className="font-mono text-[11px] text-technical-muted">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-comic-yellow group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Message Dispatcher Console */}
        <div className="lg:col-span-3 bg-blueprint-900/85 border-2 border-comic-yellow/50 rounded-2xl p-6 sm:p-8 shadow-comic-lg backdrop-blur">
          <div className="font-mono text-xs text-comic-yellow font-bold uppercase tracking-wider mb-5 pb-3 border-b border-comic-yellow/20">
            TRANSMIT DIRECT INQUIRY //
          </div>

          {sent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-comic-yellow mx-auto animate-bounce" />
              <div className="text-xl font-black text-technical-white">TRANSMISSION PREPARED</div>
              <p className="text-xs text-technical-cream/80 max-w-sm mx-auto">
                Your email client has been launched with the populated dispatch parameters. Thank you for reaching out!
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 font-mono text-xs text-comic-yellow hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-technical-cream/80 mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Jane Doe"
                    className="w-full bg-blueprint-950 border border-comic-yellow/30 rounded-lg px-3.5 py-2.5 text-sm text-technical-white focus:outline-none focus:border-comic-yellow font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-technical-cream/80 mb-1">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@university.edu"
                    className="w-full bg-blueprint-950 border border-comic-yellow/30 rounded-lg px-3.5 py-2.5 text-sm text-technical-white focus:outline-none focus:border-comic-yellow font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-technical-cream/80 mb-1">COLLABORATION TOPIC</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full bg-blueprint-950 border border-comic-yellow/30 rounded-lg px-3.5 py-2.5 text-sm text-technical-white focus:outline-none focus:border-comic-yellow font-mono"
                >
                  <option>Research Collaboration (AI / Speech)</option>
                  <option>Software Assurance (Rudra Sentinel)</option>
                  <option>Avionics & Embedded Hardware</option>
                  <option>Aerospace & Space Systems</option>
                  <option>College Application / Mentorship</option>
                  <option>Other Engineering Discussion</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs text-technical-cream/80 mb-1">MESSAGE / PROPOSAL</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your technical inquiry, proposal, or feedback..."
                  className="w-full bg-blueprint-950 border border-comic-yellow/30 rounded-lg px-3.5 py-2.5 text-sm text-technical-white focus:outline-none focus:border-comic-yellow font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                data-cursor="contact"
                className="w-full bg-comic-yellow hover:bg-comic-bright text-blueprint-950 font-black py-3 px-6 rounded-lg shadow-comic hover:shadow-comic-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
              >
                <Send className="w-4 h-4" />
                <span>DISPATCH TRANSMISSION</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Minimal Calmed Footer (Section 6 Standard) */}
      <footer className="pt-10 border-t border-comic-yellow/20 text-technical-cream/70 select-none">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6">
          {/* Brand Identity */}
          <div className="text-center md:text-left">
            <div className="font-black text-xl text-comic-yellow tracking-tight">
              PRANAV MISHRA
            </div>
            <div className="font-mono text-xs text-technical-cream/60 mt-0.5">
              AI • SOFTWARE • ENGINEERING DESIGN
            </div>
          </div>

          {/* Social Profiles Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LINKS.linkedin.ariaLabel}
              data-cursor="contact"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-1.5 hover:text-comic-yellow transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <span className="text-comic-yellow/40">/</span>

            <a
              href={SOCIAL_LINKS.x.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LINKS.x.ariaLabel}
              data-cursor="contact"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-1.5 hover:text-comic-yellow transition-colors"
            >
              <XIcon className="w-3.5 h-3.5" />
              <span>X</span>
            </a>

            <span className="text-comic-yellow/40">/</span>

            <a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LINKS.instagram.ariaLabel}
              data-cursor="contact"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-1.5 hover:text-comic-yellow transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>

            <span className="text-comic-yellow/40">/</span>

            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LINKS.github.ariaLabel}
              data-cursor="code"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-1.5 hover:text-comic-yellow transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Telemetry Status */}
          <div className="flex items-center gap-2 font-mono text-xs text-technical-cream/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-comic-yellow font-bold">PRANAV // SYSTEM ONLINE</span>
          </div>
        </div>

        <div className="text-center font-mono text-[11px] text-technical-muted pt-4 border-t border-white/5">
          © 2026 PRANAV KUMAR MISHRA · BUILT WITH NEXT.JS, THREE.JS & FIRST-PRINCIPLES ENGINEERING
        </div>
      </footer>
    </section>
  );
}

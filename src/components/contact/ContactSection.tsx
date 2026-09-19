"use client";

import React, { useState } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Copy, Check, Send } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolioContent";
import { sounds } from "../audio/SoundSystem";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playTargetLock();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 select-none">
      <div className="space-y-16">
        {/* Large Bold Editorial Statement */}
        <div className="space-y-4 max-w-3xl">
          <div className="font-mono text-xs text-[#ff5a36] font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff5a36] animate-pulse" />
            <span>DIRECT INQUIRIES &amp; COLLABORATION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#f2f2ed] leading-[1.02]">
            LET&apos;S BUILD SOMETHING DIFFICULT.
          </h2>

          <p className="text-base sm:text-lg text-[#a5acb8] font-sans leading-relaxed pt-2">
            Open for research discussions, on-device intelligence architecture, embedded flight control,
            and hard technical engineering challenges.
          </p>
        </div>

        {/* Primary Direct Channel Card & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Direct Email Card */}
          <div className="lg:col-span-6 bg-[#111318] border border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xl">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#ff5a36] uppercase font-bold tracking-wider block">
                PRIMARY EMAIL CHANNEL
              </span>
              <div className="text-2xl sm:text-4xl font-mono font-black text-[#f2f2ed] tracking-tight break-all">
                {PERSONAL_INFO.email}
              </div>
              <p className="font-sans text-sm text-[#a5acb8]">
                Personal inbox monitored directly. PGP and technical research dispatches welcomed.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ff5a36] hover:bg-[#ff6f4e] text-white font-mono text-xs font-bold transition-all shadow-md shadow-[#ff5a36]/20 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>COMPOSE EMAIL</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#0d0e11] hover:bg-[#161922] border border-white/10 text-[#f2f2ed] font-mono text-xs font-semibold transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">COPIED ADDRESS</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#a5acb8]" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-6 bg-[#111318] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col justify-between">
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 font-mono">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#f2f2ed]">MESSAGE DISPATCHED</h4>
                <p className="text-xs text-[#a5acb8] max-w-xs font-sans">
                  Thank you. Your dispatch has been prepared. You can also reach out directly via {PERSONAL_INFO.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/05">
                  <span className="text-[#a5acb8] font-bold uppercase tracking-wider">
                    QUICK TECHNICAL MESSAGE
                  </span>
                  <span className="text-[#6b7280] text-[10px]">ENCRYPTED DISPATCH</span>
                </div>

                <div>
                  <label className="block text-[#a5acb8] mb-1.5 font-bold">NAME / ORGANIZATION</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Dr. / Eng. / Founder"
                    className="w-full px-4 py-3 rounded-xl bg-[#0d0e11] border border-white/10 text-[#f2f2ed] placeholder-[#6b7280] focus:border-[#ff5a36] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#a5acb8] mb-1.5 font-bold">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#0d0e11] border border-white/10 text-[#f2f2ed] placeholder-[#6b7280] focus:border-[#ff5a36] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#a5acb8] mb-1.5 font-bold">INQUIRY / RESEARCH OBJECTIVE</label>
                  <textarea
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Details regarding technical inquiry, collaboration, or code inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0d0e11] border border-white/10 text-[#f2f2ed] placeholder-[#6b7280] focus:border-[#ff5a36] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0d0e11] hover:bg-[#ff5a36] hover:text-white border border-white/15 hover:border-[#ff5a36] text-[#f2f2ed] font-bold tracking-wide transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT DISPATCH</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Verified Social Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
          <a
            href={SOCIAL_LINKS.github.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="p-6 rounded-2xl bg-[#111318] border border-white/10 hover:border-[#ff5a36]/60 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <Github className="w-5 h-5 text-[#a5acb8] group-hover:text-[#ff5a36] transition-colors" />
              <ArrowUpRight className="w-4 h-4 text-[#6b7280] group-hover:text-[#f2f2ed]" />
            </div>
            <div className="text-base font-bold text-[#f2f2ed]">GitHub</div>
            <div className="text-xs text-[#a5acb8] mt-1 font-sans">
              Public codebases, firmware repositories, and technical proof.
            </div>
          </a>

          <a
            href={SOCIAL_LINKS.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="p-6 rounded-2xl bg-[#111318] border border-white/10 hover:border-[#35d9ff]/60 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <Linkedin className="w-5 h-5 text-[#a5acb8] group-hover:text-[#35d9ff] transition-colors" />
              <ArrowUpRight className="w-4 h-4 text-[#6b7280] group-hover:text-[#f2f2ed]" />
            </div>
            <div className="text-base font-bold text-[#f2f2ed]">LinkedIn</div>
            <div className="text-xs text-[#a5acb8] mt-1 font-sans">
              Verified career milestones, hackathons, and research history.
            </div>
          </a>

          <a
            href={SOCIAL_LINKS.x.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="p-6 rounded-2xl bg-[#111318] border border-white/10 hover:border-[#b7ff45]/60 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <XIcon className="w-5 h-5 text-[#a5acb8] group-hover:text-[#b7ff45] transition-colors" />
              <ArrowUpRight className="w-4 h-4 text-[#6b7280] group-hover:text-[#f2f2ed]" />
            </div>
            <div className="text-base font-bold text-[#f2f2ed]">X (Twitter)</div>
            <div className="text-xs text-[#a5acb8] mt-1 font-sans">
              Hardware experiments, failure autopsies, and lab notes.
            </div>
          </a>
        </div>

        {/* Footer Attribution & Status */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#6b7280]">
          <div>
            <span>PRANAV KUMAR MISHRA &bull; 2026</span>
          </div>
          <div>
            <span>RESEARCH ENGINEER &bull; PUNJAB, INDIA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { Send, Github, Linkedin, Mail, Instagram, ExternalLink, CheckCircle2 } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolioData";
import { sounds } from "../audio/SoundSystem";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Technical Inquiry",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playTargetLock();
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.topic} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.topic}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const socialLinks = [
    {
      label: "GitHub",
      url: SOCIAL_LINKS.github.url,
      icon: Github,
      detail: "Open-source repositories and firmware codebases",
    },
    {
      label: "LinkedIn",
      url: SOCIAL_LINKS.linkedin.url,
      icon: Linkedin,
      detail: "Engineering background and research collaborations",
    },
    {
      label: "X (Twitter)",
      url: SOCIAL_LINKS.x.url,
      icon: XIcon,
      detail: "Technical observations, rapid builds, and notes",
    },
    {
      label: "Instagram",
      url: SOCIAL_LINKS.instagram.url,
      icon: Instagram,
      detail: "Visual work, bench tests, and hardware prototypes",
    },
  ];

  return (
    <section id="contact" className="w-full pt-20 pb-12 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#262E3B]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#262E3B] pb-4 mb-12">
        <div>
          <div className="font-mono text-xs text-[#F59E0B] font-semibold uppercase tracking-wider">
            COMMUNICATION & CHANNELS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9] mt-1">
            Get in Touch
          </h2>
        </div>
        <div className="font-mono text-xs text-[#94A3B8] bg-[#14171E] border border-[#262E3B] px-3 py-1 rounded-full">
          OPEN TO TECHNICAL DIALOGUE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left Column: Direct Platforms & Context */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-[#F1F5F9] leading-snug">
              Open to technical feedback, hardware discussions, and project critiques.
            </p>
            <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
              If you have feedback on my architectures, want to discuss local SLM inference, 
              or are building hardware systems under tight physical constraints, feel free to reach out.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-[#14171E] border border-[#262E3B] hover:border-[#F59E0B] rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#94A3B8] group-hover:text-[#F59E0B] transition-colors" />
                    <div>
                      <div className="text-xs font-bold text-[#F1F5F9] font-mono group-hover:text-[#F59E0B] transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#64748B] font-sans">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#F59E0B] transition-colors" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column: Direct Dispatch Form */}
        <div className="lg:col-span-7 bg-[#14171E] border border-[#262E3B] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#F59E0B]" />
            <span>DIRECT EMAIL DISPATCH</span>
          </div>

          {sent ? (
            <div className="p-6 bg-[#1C212B] border border-emerald-800/60 rounded-xl space-y-3 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="font-mono text-sm font-bold text-[#F1F5F9]">
                CLIENT DISPATCH GENERATED
              </div>
              <p className="text-xs text-[#94A3B8] font-sans">
                Your email client has been launched with the populated message parameters.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#94A3B8] text-[11px] uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3 py-2.5 bg-[#0D0F12] border border-[#262E3B] text-[#F1F5F9] placeholder:text-[#64748B] rounded-lg focus:outline-none focus:border-[#F59E0B] transition-colors font-sans text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#94A3B8] text-[11px] uppercase">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-3 py-2.5 bg-[#0D0F12] border border-[#262E3B] text-[#F1F5F9] placeholder:text-[#64748B] rounded-lg focus:outline-none focus:border-[#F59E0B] transition-colors font-sans text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#94A3B8] text-[11px] uppercase">Subject / Topic</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#0D0F12] border border-[#262E3B] text-[#F1F5F9] rounded-lg focus:outline-none focus:border-[#F59E0B] transition-colors font-sans text-xs"
                >
                  <option value="Technical Collaboration">Technical Collaboration / Research</option>
                  <option value="Local SLMs & Speech">Local AI & ASR Systems (LocalFlow)</option>
                  <option value="Avionics & Embedded">Avionics & Microcontrollers (AUTOSTABI / Wand)</option>
                  <option value="Simulation & Math">Scientific Simulation & ODEs (PRIVAVEDA)</option>
                  <option value="General Inquiry">General Question / Critique</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#94A3B8] text-[11px] uppercase">Message Content</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide technical context, questions, or collaboration details..."
                  className="w-full px-3 py-2.5 bg-[#0D0F12] border border-[#262E3B] text-[#F1F5F9] placeholder:text-[#64748B] rounded-lg focus:outline-none focus:border-[#F59E0B] transition-colors font-sans text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#F59E0B] text-[#0D0F12] hover:bg-[#D97706] py-3 rounded-lg font-bold transition-colors shadow-sm"
              >
                <span>TRANSMIT DISPATCH VIA MAILTO</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="pt-8 border-t border-[#262E3B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
          <span className="text-[#94A3B8] font-bold">{PERSONAL_INFO.name}</span>
          <span>•</span>
          <span>{PERSONAL_INFO.role}</span>
        </div>
        <div>
          <span>EST. 2026 // OPEN-SOURCE ENGINEERING</span>
        </div>
      </footer>
    </section>
  );
}

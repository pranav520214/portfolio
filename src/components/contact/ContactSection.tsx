"use client";

import React, { useState } from "react";
import { Send, Github, Linkedin, Mail, ExternalLink, CheckCircle2 } from "lucide-react";
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
    topic: "Technical Collaboration",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playTargetLock();
    const subject = encodeURIComponent(`[Inquiry] ${formData.topic} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.topic}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const socialLinks = [
    {
      label: "LinkedIn",
      url: SOCIAL_LINKS.linkedin.url,
      icon: Linkedin,
      detail: "Professional background and project updates",
    },
    {
      label: "GitHub",
      url: SOCIAL_LINKS.github.url,
      icon: Github,
      detail: "Code repositories and technical prototypes",
    },
    {
      label: "X (Twitter)",
      url: SOCIAL_LINKS.x.url,
      icon: XIcon,
      detail: "Short research observations and build notes",
    },
  ];

  return (
    <section id="contact" className="w-full pt-20 pb-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#D8D6CD]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#D8D6CD] pb-4 mb-12">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider">
            COMMUNICATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mt-1">
            Get in Touch
          </h2>
        </div>
        <div className="font-mono text-xs text-[#666666]">
          [ OPEN TRANSMISSION LINES ]
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left Column: Direct Platforms & Context */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-[#111111] leading-snug">
              Open to technical discussions, research inquiries, and project critiques.
            </p>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              If you have feedback on my architectures, want to discuss small language models, 
              or are building hardware systems under tight physical constraints, I would be glad to connect.
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
                  className="flex items-center justify-between p-4 bg-[#FFFFFF] border border-[#D8D6CD] hover:border-[#111111] rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#111111] group-hover:text-[#D94431] transition-colors" />
                    <div>
                      <div className="font-bold text-sm text-[#111111]">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#666666]">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#888888] group-hover:text-[#111111] transition-colors" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#D8D6CD] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider border-b border-[#EAE8DF] pb-3 mb-6 flex items-center justify-between">
            <span>DIRECT INQUIRY FORM</span>
            <span className="text-[#888888] text-[11px]">DISPATCH VIA EMAIL</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] font-bold text-[#444444] uppercase">
                  NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-[#FAF9F5] border border-[#D8D6CD] rounded-lg px-3.5 py-2.5 text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] font-bold text-[#444444] uppercase">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@organization.org"
                  className="w-full bg-[#FAF9F5] border border-[#D8D6CD] rounded-lg px-3.5 py-2.5 text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] font-bold text-[#444444] uppercase">
                INQUIRY TOPIC
              </label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full bg-[#FAF9F5] border border-[#D8D6CD] rounded-lg px-3.5 py-2.5 text-[#111111] focus:outline-none focus:border-[#111111]"
              >
                <option>Technical Collaboration</option>
                <option>Research Inquiry / Mentorship</option>
                <option>System Architecture Feedback</option>
                <option>General Question</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] font-bold text-[#444444] uppercase">
                MESSAGE
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your technical inquiry, project question, or feedback..."
                className="w-full bg-[#FAF9F5] border border-[#D8D6CD] rounded-lg px-3.5 py-2.5 text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#111111] text-[#F5F4EF] hover:bg-[#D94431] font-mono text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CLIENT DISPATCH OPENED</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT MESSAGE</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="border-t border-[#D8D6CD] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#888888]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#111111]">PRANAV MISHRA</span>
          <span>•</span>
          <span>CS + AI + ENGINEERING DESIGN</span>
        </div>
        <div>
          &ldquo;Ideas. Code. Design. Build. Repeat.&rdquo;
        </div>
        <div>
          © 2026 // RESEARCH & ENGINEERING NOTEBOOK
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { ENGINEERING_NOTES, EngineeringNoteMeta } from "@/data/portfolioContent";
import { BookOpen, Calendar, ArrowRight, X, ChevronRight, ChevronLeft, Bookmark } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { AccessibleModal } from "../ui/AccessibleModal";
import Link from "next/link";

export function EngineeringNotebookSection() {
  const [selectedNote, setSelectedNote] = useState<EngineeringNoteMeta | null>(null);

  return (
    <section id="notebook" className="w-full py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-white/10 pb-5 mb-10">
        <div>
          <div className="font-mono text-xs text-[#ff6a2a] font-semibold uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>FIELD EXPERIMENTS & ANOMALY LOGS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f3ee] mt-1">
            Engineering Notebook
          </h2>
        </div>
        <div className="font-mono text-xs text-[#94a3b8] bg-[#121822] border border-white/10 px-3 py-1 rounded-full">
          HORIZONTAL FOLIO // EMPIRICAL NOTEBOOK PAGES
        </div>
      </div>

      {/* Horizontal Strip of Physical Engineering Notebook Pages */}
      <div className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-hide">
        {ENGINEERING_NOTES.map((note, index) => (
          <article
            key={note.slug}
            onClick={() => {
              sounds.playClick();
              setSelectedNote(note);
            }}
            className="flex-shrink-0 w-[310px] sm:w-[350px] bg-[#111318] text-[#f2f2ed] rounded-2xl p-6 sm:p-7 shadow-xl border border-white/10 flex flex-col justify-between cursor-pointer group hover:-translate-y-1.5 hover:border-[#ff5a36]/40 transition-all duration-300 relative overflow-hidden"
          >
            {/* Left Margin Red Technical Rule */}
            <div className="absolute left-4 inset-y-0 w-[1.5px] bg-[#ff5a36]/30" />

            {/* Notebook Content (Indented past margin) */}
            <div className="pl-4 space-y-4">
              {/* Header: Date Stamp & Folio Entry Number */}
              <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-3 text-[#a5acb8]">
                <div className="flex items-center gap-1.5 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-[#ff5a36]" />
                  <span>{note.date}</span>
                </div>
                <span className="text-[10px] font-bold text-[#ff5a36] bg-[#ff5a36]/10 px-2 py-0.5 rounded">
                  LOG #0{index + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-[#f2f2ed] group-hover:text-[#ff5a36] transition-colors leading-snug tracking-tight">
                {note.title}
              </h3>

              {/* Domain Tag */}
              <div className="inline-block font-mono text-[10px] text-[#35d9ff] bg-[#35d9ff]/10 border border-[#35d9ff]/20 px-2 py-0.5 rounded font-semibold uppercase">
                {note.domain}
              </div>

              {/* Research Question snippet */}
              <div className="space-y-1 pt-1">
                <span className="font-mono text-[9px] text-[#ff5a36] uppercase font-bold tracking-widest block">
                  INQUIRY //
                </span>
                <p className="text-xs text-[#a5acb8] font-sans leading-relaxed line-clamp-3">
                  &ldquo;{note.question}&rdquo;
                </p>
              </div>
            </div>

            {/* Bottom Notebook Action */}
            <div className="pl-4 pt-4 mt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="text-[10px] text-[#6b7280] uppercase font-bold tracking-wider">
                INSPECT LAB NOTE
              </span>
              <div className="flex items-center gap-1 text-[#ff5a36] font-bold group-hover:translate-x-1 transition-transform">
                <span>READ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Accessible Detail Modal for Selected Lab Note */}
      <AccessibleModal
        isOpen={!!selectedNote}
        onClose={() => setSelectedNote(null)}
        title={selectedNote?.title || "Engineering Note"}
      >
        {selectedNote && (
          <div className="space-y-6 font-sans">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs pb-3 border-b border-[rgba(255,255,255,0.08)]">
              <span className="text-[#ff6a2a] font-bold uppercase">{selectedNote.domain}</span>
              <span className="text-[#64748B]">•</span>
              <span className="text-[#94A3B8]">{selectedNote.date}</span>
            </div>

            <div className="bg-[#0D0F14] border border-[rgba(255,255,255,0.06)] p-4 rounded-xl space-y-2">
              <span className="font-mono text-[10px] text-[#ffc84a] font-bold uppercase tracking-wider block">
                RESEARCH QUESTION //
              </span>
              <p className="text-sm font-bold text-[#F1F5F9] leading-relaxed">
                "{selectedNote.question}"
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] text-[#ff6a2a] font-bold uppercase tracking-wider block">
                EMPIRICAL OBSERVATION & FAILURE MODE //
              </span>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {selectedNote.observation}
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] text-[#10B981] font-bold uppercase tracking-wider block">
                ARCHITECTURAL CHANGE & RESOLUTION //
              </span>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {selectedNote.whatChanged}
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
              <Link
                href={`/notes/${selectedNote.slug}`}
                className="font-mono text-xs text-[#ff6a2a] hover:text-[#ffa066] font-bold inline-flex items-center gap-1.5 transition-colors"
              >
                <span>OPEN CANONICAL NOTE PAGE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </AccessibleModal>
    </section>
  );
}

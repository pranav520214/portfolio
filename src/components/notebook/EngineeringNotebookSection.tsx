"use client";

import React, { useState } from "react";
import { ENGINEERING_NOTES, EngineeringNoteMeta } from "@/data/portfolioContent";
import { BookOpen, Calendar, ArrowRight, X } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

export function EngineeringNotebookSection() {
  const [selectedNote, setSelectedNote] = useState<EngineeringNoteMeta | null>(null);

  return (
    <section id="notebook" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#D8D6CD]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#D8D6CD] pb-4 mb-10">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>LAB NOTEBOOK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mt-1">
            Engineering Notebook
          </h2>
        </div>
        <div className="font-mono text-xs text-[#666666]">
          [ FIELD OBSERVATIONS & SYSTEM ANOMALIES ]
        </div>
      </div>

      {/* Grid of Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ENGINEERING_NOTES.map((note) => (
          <article
            key={note.slug}
            onClick={() => {
              sounds.playClick();
              setSelectedNote(note);
            }}
            className="group cursor-pointer bg-[#FFFFFF] border border-[#D8D6CD] hover:border-[#111111] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-[#888888]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#D94431]" />
                  <span>{note.date}</span>
                </span>
                <span className="text-[11px] text-[#D94431] font-bold uppercase">{note.domain}</span>
              </div>

              <h3 className="text-base font-bold text-[#111111] group-hover:text-[#D94431] transition-colors leading-snug">
                {note.title}
              </h3>

              <div className="pt-2 border-t border-[#EAE8DF] space-y-2 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-[#888888] uppercase font-bold block">
                    QUESTION //
                  </span>
                  <p className="text-[#333333] font-medium leading-relaxed">
                    {note.question}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#EAE8DF] flex items-center justify-between font-mono text-xs text-[#666666] group-hover:text-[#111111]">
              <span>READ ENTRY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </article>
        ))}
      </div>

      {/* Note Reader Modal Drawer */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF9F5] border border-[#111111] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 text-[#111111]">
            <div className="flex items-center justify-between border-b border-[#D8D6CD] pb-4">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="bg-[#D94431] text-white px-2 py-0.5 rounded font-bold">
                  {selectedNote.date}
                </span>
                <span className="text-[#666666] font-bold uppercase tracking-wider">
                  {selectedNote.domain}
                </span>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="p-1 text-[#666666] hover:text-[#111111] transition-colors"
                aria-label="Close Note"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
                {selectedNote.title}
              </h3>

              <div className="space-y-1 bg-[#FFFFFF] border border-[#D8D6CD] p-4 rounded-xl font-mono text-xs">
                <span className="font-bold text-[#D94431] uppercase tracking-wider block mb-1">
                  QUESTION //
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#111111]">
                  &ldquo;{selectedNote.question}&rdquo;
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[#888888] uppercase tracking-wider block">
                  OBSERVATION & MEASUREMENT //
                </span>
                <p className="text-sm text-[#444444] leading-relaxed">
                  {selectedNote.observation}
                </p>
              </div>

              <div className="space-y-2 bg-[#FAF9F5] border-l-4 border-l-[#111111] p-4 rounded-r-xl">
                <span className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider block">
                  WHAT CHANGED AFTER TESTING //
                </span>
                <p className="text-sm text-[#222222] font-mono leading-relaxed">
                  {selectedNote.whatChanged}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D8D6CD] flex justify-end">
              <button
                onClick={() => setSelectedNote(null)}
                className="font-mono text-xs bg-[#111111] text-[#F5F4EF] hover:bg-[#D94431] px-4 py-2 rounded transition-colors"
              >
                [ CLOSE ENTRY ]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import React from "react";
import { getAllNotes, getNoteBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function NotePage({ params }: PageProps) {
  const note = getNoteBySlug(params.slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F1F5F9] font-sans selection:bg-[#D94431] selection:text-white pb-24">
      <header className="fixed top-0 w-full z-40 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/#notebook" className="flex items-center gap-2 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors font-mono text-xs uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO WORKSTATION</span>
          </Link>
          <div className="flex items-center gap-2 text-[#D94431] font-mono text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>LAB NOTEBOOK</span>
          </div>
        </div>
      </header>

      <main className="pt-32 px-6 max-w-3xl mx-auto">
        <article className="space-y-12">
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
              <span className="bg-[#D94431] text-white px-2.5 py-1 rounded font-bold tracking-wider">
                LOG // {note.date}
              </span>
              <span className="text-[#F59E0B] font-bold uppercase tracking-wider bg-[#161B26] px-3 py-1 rounded border border-[rgba(255,255,255,0.08)]">
                {note.domain}
              </span>
              <span className="text-[#10B981] font-bold uppercase tracking-wider bg-[#0D0F14] px-3 py-1 rounded border border-[rgba(255,255,255,0.08)]">
                {note.status}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F1F5F9] leading-tight">
              {note.title}
            </h1>
          </header>

          <div className="space-y-10">
            {note.question && (
              <section className="space-y-4">
                <div className="font-mono text-xs font-bold text-[#D94431] uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(255,255,255,0.08)] pb-2">
                  <span>QUESTION //</span>
                </div>
                <div className="text-base sm:text-lg text-[#F1F5F9] leading-relaxed font-sans bg-[#121620] p-6 rounded-2xl border border-[rgba(255,255,255,0.06)]">
                  {note.question}
                </div>
              </section>
            )}

            {note.observation && (
              <section className="space-y-4">
                <div className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(255,255,255,0.08)] pb-2">
                  <span>OBSERVATION & EMPIRICAL DIAGNOSTIC //</span>
                </div>
                <div className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-sans prose prose-invert max-w-none">
                  {note.observation}
                </div>
              </section>
            )}

            {note.resolution && (
              <section className="space-y-4">
                <div className="font-mono text-xs font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(255,255,255,0.08)] pb-2">
                  <span>SYSTEM REFACTOR & RESOLUTION //</span>
                </div>
                <div className="text-sm sm:text-base text-[#F1F5F9] leading-relaxed font-sans prose prose-invert max-w-none bg-[#0D0F14] p-6 rounded-2xl border border-[rgba(255,255,255,0.06)]">
                  {note.resolution}
                </div>
              </section>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolioContent";

export function AtlasContact() {
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setStatus("Email copied");
    } catch {
      setStatus("Select the email address to copy it.");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 4000);
  }
  return (
    <section id="contact" className="atlas-section contact-atlas">
      <p className="chapter-label">07 / The next hello</p>
      <h2>
        Good things begin
        <br />
        with <span>a conversation.</span>
      </h2>
      <p>
        Have a curious question, a difficult problem or something you want to
        build?
      </p>
      <div className="contact-email">
        <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
        <button onClick={copy}>
          {status === "Email copied" ? <Check size={16} /> : <Copy size={16} />}
          Copy email
        </button>
      </div>
      <p role="status" className="min-h-6 text-xs">
        {status || "Straight to my existing inbox. Say hello."}
      </p>
      <nav className="social-atlas" aria-label="Social profiles">
        {[
          SOCIAL_LINKS.github,
          SOCIAL_LINKS.instagram,
          SOCIAL_LINKS.linkedin,
          SOCIAL_LINKS.x,
        ].map((profile) => (
          <a
            key={profile.id}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={profile.ariaLabel}
          >
            {profile.name}
            <ArrowUpRight size={17} />
          </a>
        ))}
      </nav>
      <footer className="studio-footer">
        <span>© 2026 PRANAV KUMAR MISHRA</span>
        <span>BUILT WITH CURIOSITY / V03</span>
        <Link href="/">BACK TO THE CONSTELLATIONS ↗</Link>
      </footer>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CAPABILITIES } from "@/data/portfolioContent";

export function StudioIndex({
  notes,
}: {
  notes: { slug: string; title: string }[];
}) {
  return (
    <section id="notebook" className="atlas-section studio-index">
      <div>
        <p className="chapter-label">06 / Open notebook</p>
        <h2>
          The work between
          <br />
          the finished work.
        </h2>
        <p>
          Questions, observations and the changes that followed. Notes from the
          parts of engineering that rarely make the highlight reel.
        </p>
        <div className="notebook-links">
          {notes.map((note) => (
            <Link href={`/notes/${note.slug}`} key={note.slug}>
              {note.title}
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      </div>
      <div id="across-disciplines">
        <p className="chapter-label">Across disciplines</p>
        <h2>
          A connected
          <br />
          way of thinking.
        </h2>
        <p>
          I move between software and hardware because the interesting questions
          often live at their boundary. A sensor needs good firmware. A model
          needs a reliable runtime. Both need a real problem to solve.
        </p>
        <div className="studio-domains">
          {CAPABILITIES.map((group) => (
            <span key={group.category}>{group.label}</span>
          ))}
        </div>
        <div id="privantrix" className="mt-10">
          <h3 className="text-2xl mb-4">Privantrix</h3>
          <p>
            My exploration of intelligent systems also reaches into aerospace
            concepts and scientific simulation. The questions stay connected:
            what can I model, build, measure and improve?
          </p>
          <div className="hero-actions">
            <Link href="/engineering-lab" className="atlas-link">
              Explore the spatial lab <ArrowUpRight size={16} />
            </Link>
            <a
              href="/certificates/proof-isro-response.png"
              target="_blank"
              rel="noopener noreferrer"
              className="atlas-link"
            >
              Aerospace correspondence <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

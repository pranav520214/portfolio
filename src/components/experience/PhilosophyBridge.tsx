import { ArrowUpRight } from "lucide-react";
import { PortalLink } from "../portal/PortalLink";

export function PhilosophyBridge({ fullPage = false }: { fullPage?: boolean }) {
  return <section id="philosophy" className="philosophy-bridge">
    <p className="chapter-label">{fullPage ? "My Engineering Philosophy" : "05 / The thinking beneath the building"}</p>
    {fullPage ? <h1 className="sr-only">My Engineering Philosophy</h1> : null}
    <h2>Make it.<br />Break it.<br /><em>Understand it.</em></h2>
    <div className="philosophy-bridge-bottom"><p>Every system begins with a constraint. Every failure teaches a measurement. Every measurement informs the next build. The most useful thing I can make is a better question.</p>{!fullPage && <PortalLink href="/philosophy" className="atlas-link" label="Opening the engineering philosophy">My Engineering Philosophy <ArrowUpRight size={18} /></PortalLink>}</div>
  </section>;
}

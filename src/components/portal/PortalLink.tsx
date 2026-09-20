"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NamasteMark } from "../intro/NamasteMark";
import { MOTION_KEY } from "../experience/useMotionPreference";

export function PortalLink({ href, children, className = "", label = "Opening the studio" }: {
  href: string; children: ReactNode; className?: string; label?: string;
}) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  function enter(event: MouseEvent<HTMLAnchorElement>) {
    let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try { reduced ||= localStorage.getItem(MOTION_KEY) === "true"; } catch { /* Navigation never depends on storage. */ }
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0 || reduced) return;
    event.preventDefault();
    if (opening) return;
    setOpening(true);
    timer.current = setTimeout(() => {
      router.push(href);
      timer.current = setTimeout(() => setOpening(false), 1800);
    }, 850);
  }
  return <>
    <Link href={href} className={className} onClick={enter}>{children}</Link>
    {opening && createPortal(<div className="namaste-portal" role="status" aria-live="polite">
      <div className="portal-iris"><i /><i /><i /><NamasteMark /></div><p>{label}</p>
    </div>, document.body)}
  </>;
}

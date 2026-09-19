"use client";
import dynamic from "next/dynamic";
import { Component, ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useSceneActivity } from "./useSceneActivity";

const AssemblyScene = dynamic(() => import("./AssemblyScene").then(m => m.AssemblyScene), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function AssemblyFallback() {
  return <div className="assembly-fallback" aria-hidden="true"><div className="assembly-plate" /><div className="assembly-plate" /><div className="assembly-plate" /></div>;
}

export function ScrollAssembly({ motionReduced = false }: { motionReduced?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const active = useSceneActivity(ref);
  const systemReduced = useReducedMotion();
  const reduced = systemReduced || motionReduced;
  const [supported, setSupported] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  useEffect(() => {
    if (reduced) return;
    const probe = document.createElement("canvas");
    try {
      const context = probe.getContext("webgl2") || probe.getContext("webgl");
      setSupported(Boolean(context));
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch { setSupported(false); }
  }, [reduced]);
  const render3d = supported && !contextLost && !reduced && active;
  return <section id="assembly" className="assembly-section" ref={ref} aria-labelledby="assembly-title">
    <div className="assembly-sticky">
      <div className="assembly-content">
        <p className="chapter-label">02 / From a thought to a thing</p>
        <h2 id="assembly-title">A little code.<br />A little copper.<span>A whole system.</span></h2>
        <p>I like the moment software meets the physical world. A signal becomes a measurement. A measurement becomes a decision. A decision makes something move.</p>
      </div>
      {render3d ? <SceneBoundary fallback={<AssemblyFallback />}><div className="assembly-canvas" data-cursor="3d" aria-hidden="true"><AssemblyScene progress={scrollYProgress} onContextLost={() => setContextLost(true)} /></div></SceneBoundary> : <AssemblyFallback />}
      <span className="assembly-notice">{render3d ? "SCROLL TO ASSEMBLE / SIGNAL → LOGIC → ACTION" : "SIGNAL → LOGIC → ACTION"}</span>
      {!reduced && <motion.div className="assembly-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />}
    </div>
  </section>;
}

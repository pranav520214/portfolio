"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SPRING, STAGGER, EASE } from "@/lib/motion";

const PHILOSOPHY_WORDS = ["BUILD.", "TEST.", "FAIL.", "MEASURE.", "REBUILD."];

interface LetterProps {
  char: string;
  index: number;
  wordIndex: number;
  totalPrecedingChars: number;
}

function AnimatedLetter({ char, index, totalPrecedingChars }: LetterProps) {
  // Each letter starts with slight random displacement
  const offsetX = ((index * 17 + totalPrecedingChars * 7) % 40) - 20;
  const offsetY = ((index * 23 + totalPrecedingChars * 11) % 30) - 15;
  const rotation = ((index * 13 + totalPrecedingChars * 5) % 16) - 8;

  return (
    <motion.span
      className="inline-block"
      initial={{
        opacity: 0,
        x: offsetX,
        y: offsetY,
        rotate: rotation,
        scale: 0.85,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
      }}
      transition={{
        ...SPRING.standard,
        delay: totalPrecedingChars * STAGGER.letter,
      }}
      viewport={{ once: true, amount: 0.8 }}
    >
      {char}
    </motion.span>
  );
}

export function EngineeringPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  let totalChars = 0;

  return (
    <section id="philosophy" className="w-full bg-[#070708] text-[#f2f2ed] py-28 sm:py-36 px-4 sm:px-6 select-none border-t border-white/10 transition-colors">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        {/* Section marker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE.outExpo as any }}
          className="font-mono text-xs text-[#ff5a36] font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff5a36]" />
          <span>ENGINEERING PHILOSOPHY // EDITORIAL PERSPECTIVE</span>
        </motion.div>

        {/* The assembled statement */}
        <div className="flex flex-wrap gap-x-[0.3em] gap-y-2 leading-none">
          {PHILOSOPHY_WORDS.map((word, wordIndex) => {
            const chars = word.split("");
            const wordElement = (
              <span
                key={wordIndex}
                className="inline-flex text-[clamp(2.5rem,6vw,6rem)] font-black tracking-tight text-[#f2f2ed] font-mono"
              >
                {chars.map((char, charIndex) => {
                  const element = (
                    <AnimatedLetter
                      key={`${wordIndex}-${charIndex}`}
                      char={char}
                      index={charIndex}
                      wordIndex={wordIndex}
                      totalPrecedingChars={totalChars}
                    />
                  );
                  totalChars++;
                  return element;
                })}
              </span>
            );

            // Add space between words
            if (wordIndex < PHILOSOPHY_WORDS.length - 1) {
              return (
                <React.Fragment key={wordIndex}>
                  {wordElement}
                  <span className="inline-block w-[0.3em]" />
                </React.Fragment>
              );
            }
            return wordElement;
          })}
        </div>

        {/* Supporting context */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: totalChars * STAGGER.letter + 0.3,
            ease: EASE.outExpo as any,
          }}
          className="mt-8 text-base sm:text-lg text-[#a5acb8] max-w-2xl font-sans leading-relaxed"
        >
          Every system begins with a physical or computational constraint. Every failure teaches an empirical measurement.
          Every measurement informs a rebuild. This is the first-principles cycle that turns
          scientific curiosity into working engineering.
        </motion.p>
      </div>
    </section>
  );
}

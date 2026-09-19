"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  MoveUpRight,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/data/portfolioContent";

export function IntroPortrait() {
  return (
    <section id="hero" className="craft-hero">
      <div className="hero-intro-line hero-enter">
        <p>
          <span className="handwriting">Namaste, I’m</span>{" "}
          <span>PRANAV KUMAR MISHRA</span>
        </p>
        <span>Student engineer · Punjab, India</span>
      </div>

      <div className="portrait-stage">
        <div className="hero-drafting-lines" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <h1 className="hero-background-name" aria-label="Pranav Kumar Mishra">
          <span aria-hidden="true">PRANAV</span>
        </h1>

        <div className="hero-left-note hero-enter">
          <p className="handwriting">
            a head full of ideas,
            <br />a desk full of experiments.
          </p>
          <ArrowDownRight size={37} strokeWidth={1.2} aria-hidden="true" />
        </div>

        <div className="portrait-depth" data-hero-depth="7">
          <div className="portrait-scroll">
            <div className="portrait-cutout hero-enter-portrait">
              <div className="portrait-backing" aria-hidden="true" />
              <figure className="portrait-window">
                <Image
                  src="/hero/hero-portrait.png"
                  alt="Pranav Kumar Mishra, in the portfolio’s original illustrated portrait"
                  width={1071}
                  height={829}
                  priority
                  sizes="(max-width: 760px) 75vw, 35vw"
                />
                <figcaption>PRANAV / THE PERSON BEHIND THE PROJECTS</figcaption>
              </figure>
              <div
                className="portrait-cross portrait-cross-one"
                aria-hidden="true"
              >
                +
              </div>
              <div
                className="portrait-cross portrait-cross-two"
                aria-hidden="true"
              >
                +
              </div>
            </div>
          </div>
        </div>

        <div
          className="hero-robot-position"
          data-hero-depth="-16"
          aria-hidden="true"
        >
          <div className="hero-enter-art">
            <Image
              className="hero-robot-art"
              src="/hero/hero-robot.png"
              alt=""
              width={335}
              height={358}
              sizes="(max-width: 760px) 100px, 180px"
            />
            <span className="handwriting">
              a little AI,
              <br />a lot of curiosity.
            </span>
          </div>
        </div>
        <div
          className="hero-monitor-position"
          data-hero-depth="18"
          aria-hidden="true"
        >
          <div className="hero-enter-art">
            <Image
              className="hero-monitor-art"
              src="/hero/hero-monitor.png"
              alt=""
              width={301}
              height={339}
              sizes="(max-width: 760px) 90px, 150px"
            />
            <span className="handwriting">
              from sketch
              <br />
              to something real.
            </span>
          </div>
        </div>

        <div className="hero-craft-copy hero-enter">
          <h2>
            Code that thinks.
            <br />
            Hardware that moves.
          </h2>
          <p>
            I build across AI, software and the physical world. Usually with a
            question, a prototype, and a few things to figure out.
          </p>
          <a className="craft-primary" href="#work">
            Come see what I’m building <ArrowDownRight size={19} />
          </a>
        </div>
        <nav
          className="hero-skill-index hero-enter"
          aria-label="Explore my skills"
        >
          <span>THINGS I WORK WITH</span>
          <a href="#capabilities">
            <small>01</small> AI & local models <MoveUpRight size={14} />
          </a>
          <a href="#capabilities">
            <small>02</small> C++ & embedded <MoveUpRight size={14} />
          </a>
          <a href="#capabilities">
            <small>03</small> Systems & simulation <MoveUpRight size={14} />
          </a>
          <a
            href={SOCIAL_LINKS.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-github"
          >
            Follow the work on GitHub <ArrowUpRight size={14} />
          </a>
        </nav>
        <div className="hero-maker-seal" data-hero-depth="-9">
          <span>LEARN</span>
          <strong>↗</strong>
          <span>MAKE · REPEAT</span>
        </div>
      </div>

      <div className="hero-bottom-line">
        <span>IDEAS ARE BETTER WHEN YOU BUILD THEM.</span>
        <a href="#capabilities">
          SCROLL INTO THE WORKSHOP <ArrowDown size={15} />
        </a>
        <span className="handwriting">Have a look around.</span>
      </div>
    </section>
  );
}

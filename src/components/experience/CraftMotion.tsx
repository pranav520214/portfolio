"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** GSAP owns section choreography; CSS owns small idle details; R3F owns the assembly. */
export function useCraftMotion(
  root: RefObject<HTMLDivElement | null>,
  reduced: boolean,
) {
  useEffect(() => {
    if (reduced || !root.current) return;
    const element = root.current;
    let disposed = false;
    const lenis = new Lenis({
      duration: 0.85,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -85 },
      prevent: (node) => Boolean(node.closest("dialog")),
    });
    const tick = (time: number) => {
      if (!document.hidden) lenis.raf(time * 1000);
    };
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);

    const context = gsap.context(() => {
      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
      entrance
        .from(".hero-background-name>span", {
          yPercent: 25,
          opacity: 0,
          duration: 1.15,
        })
        .from(
          ".hero-enter-portrait",
          { y: 65, opacity: 0, rotate: -3, duration: 1.2 },
          0.12,
        )
        .from(
          ".hero-enter-art",
          { y: 35, opacity: 0, scale: 0.85, duration: 0.9, stagger: 0.12 },
          0.35,
        )
        .from(
          ".hero-enter",
          { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 },
          0.2,
        );

      const hero = element.querySelector(".craft-hero");
      if (hero) {
        gsap.to(".hero-background-name", {
          yPercent: 28,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
        gsap.to(".portrait-scroll", {
          y: -55,
          scale: 0.96,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.9,
          },
        });
        gsap.to(".hero-drafting-lines", {
          y: 45,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
      gsap.utils
        .toArray<HTMLElement>(
          ".section-heading, .garden-controls, .studio-index h2, .contact-atlas h2, .contact-email",
        )
        .forEach((block) => {
          gsap.from(block, {
            y: 30,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 92%", once: true },
          });
        });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((section) => {
        gsap.from(section, {
          y: 35,
          opacity: 0.1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 91%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".reveal-heading").forEach((heading) => {
        gsap.from(heading.querySelectorAll(".word-reveal"), {
          yPercent: 105,
          rotate: 2,
          duration: 0.85,
          stagger: 0.055,
          ease: "power3.out",
          scrollTrigger: { trigger: heading, start: "top 92%", once: true },
        });
      });
      gsap.from(".skill-sheet-back", {
        rotate: 0,
        x: 0,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".skills-workbench",
          start: "top 85%",
          end: "center center",
          scrub: 1,
        },
      });
      gsap.from(".skill-sheet-mid", {
        rotate: 0,
        x: 0,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".skills-workbench",
          start: "top 85%",
          end: "center center",
          scrub: 1,
        },
      });
      gsap.from(".tower-stage", {
        y: 65,
        opacity: 0.25,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tower-stage",
          start: "top 88%",
          once: true,
        },
      });
      gsap.from(".philosophy-bridge h2", {
        x: -30,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: ".philosophy-bridge",
          start: "top 90%",
          end: "top 30%",
          scrub: 0.8,
        },
      });
      gsap.from(".notebook-links a", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".notebook-links",
          start: "top 88%",
          once: true,
        },
      });
      gsap.from(".social-atlas a", {
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".social-atlas",
          start: "top 95%",
          once: true,
        },
      });
    }, element);

    const targets = Array.from(
      element.querySelectorAll<HTMLElement>("[data-hero-depth]"),
    ).map((node) => ({
      node,
      depth: Number(node.dataset.heroDepth),
      x: gsap.quickTo(node, "x", { duration: 0.9, ease: "power2.out" }),
      y: gsap.quickTo(node, "y", { duration: 0.9, ease: "power2.out" }),
    }));
    const hero = element.querySelector<HTMLElement>(".craft-hero");
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !hero) return;
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      targets.forEach((target) => {
        target.x(x * target.depth);
        target.y(y * target.depth);
      });
    };
    const reset = () =>
      targets.forEach((target) => {
        target.x(0);
        target.y(0);
      });
    hero?.addEventListener("pointermove", pointer, { passive: true });
    hero?.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            ((entry.target as HTMLElement).dataset.motionActive = String(
              entry.isIntersecting,
            )),
        ),
      { rootMargin: "40px" },
    );
    element
      .querySelectorAll(
        ".craft-hero,.skills-workbench,.garden-section,.philosophy-bridge",
      )
      .forEach((section) => observer.observe(section));
    document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
    const onImage = () => ScrollTrigger.refresh();
    element
      .querySelectorAll("img")
      .forEach((img) => img.addEventListener("load", onImage));

    return () => {
      disposed = true;
      hero?.removeEventListener("pointermove", pointer);
      hero?.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      element
        .querySelectorAll("img")
        .forEach((img) => img.removeEventListener("load", onImage));
      observer.disconnect();
      targets.forEach((target) => {
        gsap.killTweensOf(target.node);
        gsap.set(target.node, { clearProps: "transform" });
      });
      context.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [root, reduced]);
}

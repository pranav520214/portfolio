# v3 — Pranav's living workbench

User correction: the atlas iteration was too flat, under-animated, and did not center the face or communicate skills strongly enough. Preserve v2 independently, then improve the complete experience.

## Evidence-led corrections
1. The portrait occupied a conventional right-hand card; the user wants the face to anchor the composition. Center a larger portrait and build the typography, craft notes and existing artwork around it.
2. Skills were four passive tags near the bottom. Create a dedicated interactive skill workbench tied to actual project evidence.
3. Most headings and supporting sections appeared without a relationship to scroll. Choreograph foreground, portrait, background lettering and chapter transitions with different movement distances and clear entry order.
4. Repeated tiny numbered captions and generic copy made sections feel interchangeable. Give each chapter a specific voice and use fewer labels.
5. Green/graphite competed with the repository's vermilion illustrated identity. Return to vermilion, ink, warm paper and limited electric yellow.

## Art direction
Thesis: a personal engineering sketchbook, with Pranav at the center and the work unfolding around him.

Hero hierarchy: giant background name → centered portrait (unobscured face) → foreground welcome, discipline labels, authored margin notes and primary action. Use existing portrait, robot and monitor artwork; no new generated people or fake project imagery. Keep illustrative assets disclosed as existing artwork, never as a photograph.

Typography: locally hosted Space Grotesk for readable geometric structure and Caveat for short handwritten annotations. Body remains normal sentence case. Native script greetings use system fonts. Font licenses live with the assets.

Depth: blueprint environment, large typographic background, main portrait plane, supporting engineering artwork, foreground labels, persistent navigation. Foreground movement is bounded; primary text and controls remain steady enough to use.

Sequence: greeting constellations → centered introduction → interactive skills → scroll assembly → tower/USB project gallery → achievement trees → philosophy → notebook and contact.

Motion: use GSAP and ScrollTrigger for one composed hero entrance and section choreography. Choose Lenis as the sole smooth-scroll engine because it preserves native document flow and anchor behavior; do not install Locomotive. Existing Framer Motion remains for unrelated legacy routes and the scroll MotionValue driving R3F; do not give two engines ownership of one transform. CSS owns small hover/idle details. Freeze nonessential motion offscreen and under reduced motion.

WebGL: keep the existing scroll-driven physical assembly, improve scale and framing, and retain its static fallback. No ornamental shader background. Semantic content and all links remain in DOM.

Validation: inspect centered face, crop, occlusion, skill selection, pointer response, scroll choreography and native anchors on desktop and mobile. Verify reduced motion, keyboard controls, no overflow and no browser errors. Build and content checks must pass before saving v3.

Skills: Spatial 3D Web Architect, Animation Systems, Build Awwwards-Quality Sites; use the design-slop audit as a diagnostic, not an authorship judgment. User-provided illustrated portrait and engineering diagrams take precedence over generic new imagery.

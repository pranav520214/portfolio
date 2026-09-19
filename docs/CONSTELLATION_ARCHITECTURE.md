# Portfolio v2 — Namaste / A shared sky

## Concept and scope
The website feels like an illustrated celestial atlas opening into an engineer's workshop. Vermilion, warm ivory, electric yellow, fine blueprint lines, folded-hand greeting stars and deliberate depth unite the scenes. Slow breathing replaces flashing stars and uncontrolled particle bursts.

Written before implementation on 2026-09-19. Preserve the existing assets, project data, case studies, notes and experimental engineering-lab route. No deployment or external messages are part of this change.

## Repository review
- Next.js 14 App Router, React 18, TypeScript, Tailwind, Framer Motion and React Three Fiber are already installed. Baseline production build passed: 16 generated pages.
- Audited route composition, component families, imports, animation loops, configuration, data, local assets, contact paths and Git state. Older reports describe features that are disconnected in the actual homepage.
- `/` currently composes hero, five animated project panels, about, philosophy, capabilities, research, notebook, Privantrix, milestones, vision and contact. Existing `ConstellationIntro` and `SuspendedGallery` are unused by this route.
- `story/`, `project-universe/` and much of `portal/` are alternative animation implementations. Preserve them in version history and keep them outside the new critical route. `/engineering-lab` uses `spatial-lab/` and remains available.
- Five project canvas loops run continuously without visibility or reduced-motion gating. Replace the homepage gallery with one selected project preview.
- `AccessibleModal` advertises a dialog but lacks a focus trap and focus restoration; fix it for certificate viewing.
- Contact form reports dispatch without sending anything. Replace it with native email and honest clipboard feedback. Instagram exists in the data but is missing from the contact section.
- Portrait and certificate assets exist in `public/`; no video, GLB, font or separate Pranav Games logo was found. Use the existing illustrated portrait, original local vector branding, procedural tower art and labelled animated previews. Do not invent real project footage.
- Existing public data includes text encoding corruption. Repair affected characters without changing source claims. Existing data is retained, not independently revalidated as new achievements.
- Existing contact: `mpranav126@outlook.com`. No proxy service or invented alternate address.

## Routes and workflow
1. `/`: four visible constellation groups around a central PRANAV GAMES emblem. Orion (Indian greetings), Cassiopeia (European greetings), Lyra (East Asian greetings), Cygnus (greetings across communities). These are stylized artistic groupings, not geographical claims about the constellations.
2. Central Pranav / Pranam / प्रणव entry links (pending user preference) open a 900ms iris portal, then `/introduction`. Links still work without the transition and support modified clicks. A skip link enters directly. No forced timed intro or session-storage lockout.
3. `/introduction`: portrait + concise first-person introduction → scroll-driven WebGL engineering assembly → two telecom towers and a suspended USB project frame → achievement trees → philosophy bridge → notebook/capabilities/context → contact.
4. `/philosophy`: dedicated “My Engineering Philosophy” page. The achievement growth interaction reveals an explicit continue link; do not unexpectedly navigate while a visitor reads certificates.
5. Existing `/work/[slug]`, `/notes/[slug]`, `/engineering-lab` remain reachable. Update return links to the new introduction route; support old `/#work` and `/#notebook` bookmarks.

## Scene storyboard
| Scene | Composition | Motion / interaction | Mobile |
| --- | --- | --- | --- |
| Shared sky | Four fine-line star patterns; greetings replace luminous dots; central logo and name tabs | Folded hands breathe over 5–7 seconds; tap/focus reveals community and pronunciation; Indian group carries a drawn tricolor | Two constellations above and two below the central brand; scroll permitted on small/short screens |
| Portal | Thin vermilion orbital rings form an iris | Finite scale/opacity transition; instant entry with reduced motion | Same interaction, smaller geometry |
| Introduction | Large name, concise description, existing portrait in orange poster frame | Subtle entrance and scroll cue; no forced camera travel | Single-column text and portrait |
| Engineering | One WebGL exploded assembly behind DOM text | Scroll progress separates and reconnects hardware layers; camera damping; render on demand | DPR capped at 1; simple geometry; static fallback |
| Selected work | Two illustrated mobile towers, catenary USB cable, suspended project clip frame | Slow signal pulses and bounded sway; selector switches between five projects; case-study links | Compact towers around one frame; wrapping selectors |
| Achievements | Three branching trees with certificate leaves | A small Grow button draws branches and reveals all records; explicit philosophy transition | Stacked trees and readable records; no hidden essential evidence |
| Philosophy / contact | Warm paper editorial bridge then a calm dark footer | Scroll reveals typography; contact is native mailto and profile links | Natural flow, large touch targets |

## Component and state architecture
- `data/constellations.ts`: typed coordinates, edges, language codes, greetings, transliterations and communities.
- `ConstellationIntro`: responsive DOM/SVG composition; `PortalLink`: accessible navigation + finite transition; local branding SVG.
- `PortfolioExperience`: section order, navigation and terminal state; global MotionConfig respects reduced motion.
- `ScrollAssembly` + dynamically imported `AssemblyScene`: shared MotionValue scroll progress; WebGL capability probe + error boundary + context-loss fallback. DOM content never depends on WebGL.
- `SuspendedGallery`: project selection state and optional local video manifest. No new animation library.
- `AchievementGarden`: idle → growing → grown; completion timer cleaned up; certificate selection uses `AccessibleModal`.
- `EngineeringPhilosophy` and `/philosophy`: same editorial content, with real page navigation.

## Performance and accessibility contract
No DOM data attributes on R3F primitives. Load canvases using `next/dynamic` with SSR disabled. Demand rendering for scroll-only WebGL; pause continuous CSS motion outside the viewport and when the document is hidden. Reduced motion retains all text, greetings, evidence and navigation. Keyboard-visible focus, semantic links/buttons, dialog focus management, 44px primary controls, no viewport overflow at 320px. Audio remains procedural and muted by default. No remote runtime assets needed.

## Version workflow
The pre-existing dirty checkout is saved at commit `cf9e010`, branch `codex/portfolio-v1-preserved-2026-09-19`, tag `portfolio-v1-preserved-2026-09-19`. Development continues on `codex/namaste-constellations-v2`; main remains at its original commit. Finish with a separate v2 commit and tag, a release record, and a continuation note. Compare or restore versions using Git; do not duplicate source trees into the app bundle.

## Verification
Run production build/type validation; exercise desktop, tablet and narrow mobile layouts; test every name portal, skip, Back, old hash links, project selector/case studies, growth completion, certificate dialog keyboard handling, philosophy route and all social/mail links. Inspect reduced motion and unavailable WebGL behavior. Record observed results and remaining limits in `docs/CONSTELLATION_HANDOFF.md`.

## Reference
Names and identities checked against the [IAU constellation list](https://iauarchive.eso.org/public/themes/constellations/). The diagrams are original simplified compositions; no external artwork is copied.

# Crafted v3 implementation handoff

## Direction and workflow

Read `CRAFTED_V3_DIRECTION.md` first. It records the critique, architecture and animation plan made before the v3 implementation. The existing multilingual opening and routes remain intact. The introduction is now a living engineering workbench, centered on Pranav's original illustrated portrait. It is an illustration from the repository, not a new photograph or generated likeness.

## Composition

1. Back plane: blueprint lines and oversized vermilion name.
2. Portrait plane: centered original portrait, paper mount and yellow backing.
3. Foreground: separate original robot and monitor art, short handwritten notes, skill links and invitation.
4. Skill workbench: four selectable disciplines mapped to real capabilities and project routes.
5. Scroll narrative: physical assembly, suspended tower gallery, growing achievement records, philosophy, notebook and direct contact.

Desktop has an open three-part composition. Below 950px, copy and skills move beneath the portrait to keep the face unobstructed. Narrow phones retain the artwork hierarchy without horizontal scrolling.

## Motion ownership

- `CraftMotion.tsx`: GSAP hero entrance, section/heading reveals, scroll depth, paper spread and bounded mouse response. Cleanup reverts its styles, listeners, observers, ticker subscription and Lenis instance.
- Lenis: the sole enhanced wheel-scroll engine, preserving native touch input and anchor targets. Reduced motion destroys it.
- `SkillsWorkbench.tsx`: scoped GSAP transitions on discipline changes.
- `crafted.css`: small artwork float, hover responses and signal travel; offscreen and reduced-motion rules stop these.
- Existing `AssemblyScene.tsx`: R3F demand rendering controlled by the scroll MotionValue; static fallback and offscreen unmount remain.
- Existing portal, tower and garden components retain their interaction contracts.

Do not assign two animation engines to the same transform. The hero name entrance uses its child span; scroll moves the parent. Pointer depth, scroll and portrait entrance each have separate wrappers.

## Assets and facts

Local Space Grotesk and Caveat variable fonts downloaded from the official Google Fonts repository; OFL licenses are in `public/fonts`. No runtime Google Fonts request. Official font sources: https://github.com/google/fonts/tree/main/ofl/spacegrotesk and https://github.com/google/fonts/tree/main/ofl/caveat.

The repo has no project video recordings. The suspended display shows labelled animated system sketches. `src/data/projectMedia.ts` accepts actual local recordings when supplied. Do not label a schematic as a recording.

Contact remains `mpranav126@outlook.com`. No proxy, mail backend or simulated submission. Social links remain source-backed.

## Verification

- Content verification: four connected constellations, 22 unique language codes, five projects, eight proof records, six actual note routes, direct email and four social profiles.
- TypeScript check passed during development.
- Browser inspected at 1440x1000, 768x1024, 390x844 and 320x740; no horizontal document overflow or duplicate IDs in the checked introduction.
- Centered portrait and skill sheet composition visually checked. Corrected tablet artwork/text collision and mobile annotation spacing.
- Hardware and Simulation selectors changed descriptions, tool lists and case-study links correctly.
- Mobile menu opens and contact anchor works. Reduced-motion toggle removes Lenis and WebGL; enabling restores enhancement. No browser warning/error messages observed in the development run.
- Production build and final production smoke results are recorded below after completion.

## Continuation

Primary files: `src/app/crafted.css`, `src/components/experience/IntroPortrait.tsx`, `SkillsWorkbench.tsx`, `CraftMotion.tsx` and `PortfolioExperience.tsx`. Preserve warm paper, vermilion, ink and a small amount of yellow. Keep the face dominant, controls readable, skills tied to actual projects and decorative notes short. Do not add an unstructured collection of effects or fabricated metrics.

## Final production results

- `npm run build`: PASS, 18 statically generated pages; introduction first-load JavaScript 217 kB, opening 98.9 kB. The added motion system increases introduction JavaScript from v2's 164 kB; the opening stays lightweight.
- `npm run verify:content`: PASS.
- Production HTTP smoke: all 15 content routes returned 200.
- Production browser: checked 1024px desktop composition, Software selector, Pranam portal to introduction, mobile navigation, achievement growth, certificate dialog and Escape dismissal. No warning/error logs observed.
- Earlier v2 route and interaction verification remains documented in `CONSTELLATION_ARCHITECTURE.md`; no claim of physical-device Safari/Firefox testing.
- Preview server: `http://127.0.0.1:3002`. This is local, not a deployed release.

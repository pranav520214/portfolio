# ANTIGRAVITY HANDOFF DOCUMENT

## Current Owner
ANTIGRAVITY (OPUS)

## Handoff To
PRODUCTION DEPLOYMENT

## Current Phase
PHASE 15 — CONSTELLATION ATLAS V2 COMPLETE

## Last Completed Task
TASK AG-L14 — Constellation Atlas V2 (Multi-Route Portfolio Experience)

## Current Incomplete Task
None (All tasks AG-001 through AG-L14 are DONE and verified).

## Repository State
Production-ready Next.js 14 App Router application with React 18, TypeScript, Three.js 0.165, React Three Fiber, Framer Motion, and Tailwind CSS. Multi-route constellation experience with 18 static routes prerendered cleanly.

## Build Status
`npm run build` exits with code 0 (18/18 static pages generated successfully).

## Route Architecture
- `/` — Constellation greeting landing (4 clusters, 22 multilingual greetings, central Namaste wordmark, portal navigation)
- `/introduction` — Full portfolio experience (hero, 3D assembly, project gallery, achievements, philosophy, notebook, contact)
- `/philosophy` — Standalone engineering principles page (5 numbered principles)
- `/engineering-lab` — Isolated 3D spatial story testbed (spatial map, portal, engineering street)
- `/work/[slug]` — Individual project case studies (5 verified flagships)
- `/notes/[slug]` — Engineering notebook entries (6 field notes)

## Exact Files Created (Constellation Atlas V2)
- `src/app/introduction/page.tsx`: Full portfolio experience route.
- `src/app/philosophy/page.tsx`: Standalone engineering principles page.
- `src/app/experience.css`: 29KB complete responsive design system.
- `src/components/intro/NamasteMark.tsx`: Reusable Namaste hands SVG + Indian flag.
- `src/components/portal/PortalLink.tsx`: Animated iris transition link between routes.
- `src/components/experience/PortfolioExperience.tsx`: Master coordinator for portfolio.
- `src/components/experience/IntroPortrait.tsx`: Hero portrait section.
- `src/components/experience/ScrollAssembly.tsx`: Scroll-driven 3D PCB assembly.
- `src/components/experience/AssemblyScene.tsx`: R3F 3-layer circuit board with scroll-driven explode.
- `src/components/experience/StudioNav.tsx`: Editorial navigation bar with motion/audio/terminal controls.
- `src/components/experience/StudioIndex.tsx`: Notebook links + capability domains + Privantrix.
- `src/components/experience/PhilosophyBridge.tsx`: Philosophy section bridge.
- `src/components/experience/useSceneActivity.ts`: IntersectionObserver + visibility state hook.
- `src/components/experience/useMotionPreference.ts`: localStorage + prefers-reduced-motion hook.
- `src/components/projects/TowerGallery.tsx`: Radio tower SVG illustration with suspended project frame.
- `src/components/achievements/AchievementGarden.tsx`: Interactive growing tree visualization with leaf records.
- `src/components/contact/AtlasContact.tsx`: Email copy, social grid, footer.
- `src/data/constellations.ts`: 4 constellation groups, 22 greeting stars data.
- `src/data/projectMedia.ts`: Video slot registry (ready for recordings).
- `docs/CONSTELLATION_ARCHITECTURE.md`: Architecture documentation.
- `scripts/verify-content.cjs`: Content verification script.

## Working Features
1. **Constellation Landing**: 4 star constellations (Orion/India, Cassiopeia/Europe, Lyra/East Asia, Cygnus/World) with SVG star maps, animated breathing nodes, and multilingual greetings in native scripts.
2. **Portal Navigation**: Animated iris transition overlay when navigating between routes. Respects reduced motion preferences.
3. **Hero Portrait**: Authentic illustrated portrait with editorial framing, dual CTAs, and verified social links.
4. **Scroll Assembly**: 3D R3F circuit board assembly with scroll-driven layer separation and WebGL context loss recovery.
5. **Tower Gallery**: SVG radio tower illustration with suspended project frame, animated sway, and 5-project selector.
6. **Achievement Garden**: Interactive growing tree visualization with animated SVG branches, leaf-button records, and accessible proof modal.
7. **Philosophy Bridge**: Editorial typography leading to standalone `/philosophy` page with 5 numbered engineering principles.
8. **Studio Index**: Engineering notebook links, capability domains, and Privantrix aerospace section with ISRO correspondence.
9. **Contact**: 1-click email copy (`mpranav126@outlook.com`), social grid, and footer.
10. **Adaptive Motion**: User-controlled motion toggle + `prefers-reduced-motion` system preference support.
11. **Strict Content Integrity**: Zero academic scores, percentages, CGPA, or marks. Public contact email strictly `mpranav126@outlook.com`.

## Broken Features / Known Errors
None.

## Design Decisions That Must Be Preserved
1. **Never pass DOM `data-*` attributes to Three.js primitives** (AGENTS.md rule).
2. **Always load Three.js Canvas components with `next/dynamic` and `ssr: false`**.
3. **Keep procedural Web Audio muted by default** with a persistent user toggle.
4. **Preserve deep linking and canonical `/work/[slug]` and `/notes/[slug]` routes**.
5. **No false affiliations or fabricated external URLs**.
6. **No academic marks, school percentages, or board exam scores anywhere in the portfolio**.
7. **PortalLink respects reduced motion** — skips animation when system prefers-reduced-motion or user toggle is active.
8. **experience.css is the single source of truth for all visual styles** in the constellation experience.

## Next Exact Action
Deploy to production hosting (e.g. Vercel) or run `npm run start` to view the finalized constellation atlas portfolio.

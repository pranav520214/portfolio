# PORTFOLIO REDESIGN PLAN
**Target:** Pranav Kumar Mishra — Deep-Tech / Research Engineer Portfolio
**Location:** `E:/PROJECT_HUB/00_GITHUB/PUBLIC/portfolio`
**Contact Email:** `mpranav126@outlook.com` (Strictly Enforced)

---

## 1. Executive Summary
This document outlines the strategic redesign of the portfolio repository into a cinematic, highly interactive, and technically credible digital interface. The goal is to evolve the site from a standard developer portfolio into an "engineering laboratory notebook" that showcases deep-tech expertise in AI systems, embedded computing, robotics, and mechanistic simulation. The design will rely on high-contrast, dark-mode aesthetics, purposeful WebGL/Three.js integrations, and a strict verification-first content approach.

## 2. Repository Audit
**Current State:** Next.js 14.2.5 (App Router), React 18, Tailwind CSS, Framer Motion, React Three Fiber.
**What Exists & Works:**
- A custom Web Audio API procedural sound system (`SoundSystem.ts`).
- An interactive CLI Terminal (`TerminalModal.tsx`).
- React Three Fiber integration (`ExplodedViewVisualizer.tsx`, `EngineeringCoreScene.tsx`) protected against SSR issues.
- Basic case study generation via `/work/[slug]/page.tsx`.
**What is Broken / Technical Debt:**
- **Mojibake:** `src/app/work/[slug]/page.tsx` contains corrupted UTF-8 characters (`â€”`, `â†—`, `â€¢`).
- **Data Fracture:** Duplicated project and achievement schemas across `src/data/portfolioData.ts` and `src/data/portfolioContent.ts`.
- **Disconnected Content:** 6 rich engineering notes in `content/notes/*.md` (referencing "Rudra Sentinel") are ignored by the app; the UI uses hardcoded arrays instead.
- **Hardcoded State:** `EngineeringTimelineSection.tsx` hardcodes timeline entries instead of querying the data layer.
- **Missing Assets:** `EngineeringCoreScene.tsx` requests `/fonts/inter.woff` which doesn't exist, causing 404s.
- **Styling Inconsistencies:** `tailwind.config.ts` defines a `lab` and `engine` palette, but components hardcode arbitrary hex values (`#07080A`, `#121620`, `#14171E`, etc.).
**Dead Code:**
- `src/components/achievements/ProofModal.tsx`
- `src/components/editorial/PersonalThesis.tsx`
- Unused data constants (`BRAIN_NODES`, `TECH_STACK`).
- Dozens of unused Lucide icon imports across the codebase.
- Root directory clutter (Word docs, loose images).

## 3. Current Problems & Perception Analysis
- **First 5 Seconds:** The user is hit with a terminal and a 3D scene, which is strong, but the messaging might feel fragmented. The color inconsistencies dilute the premium "lab" feel.
- **First 30 Seconds:** The navigation (Timeline, Notebook, Archive) feels disjointed because the data sources aren't unified. The user sees project cards with colors that clash with the background.
- **Credibility Gaps:** The markdown files in `content/notes/` contain the deepest technical insights (e.g., debugging stream lifecycles, IMU noise) but are hidden from the user.

## 4. Content to Keep
- The 5 Flagship Projects: LocalFlow, AUTOSTABI, Wand Mouse, PRIVAVEDA, FS-i6X FPV Controller.
- The core WebGL concepts (Exploded View, Orbital Core).
- The Sound System (procedural audio).
- The Terminal Modal (great easter egg / power user feature).
- External Feedback / Proof documents (ISRO, IIT Delhi).

## 5. Content to Remove
- All dead code (`ProofModal.tsx`, `PersonalThesis.tsx`).
- Duplicate data schemas (Merge `portfolioData.ts` into `portfolioContent.ts`).
- Root level clutter (Move or gitignore `.docx` and loose `.png` files).
- **Strict Enforcement:** Ensure absolutely NO school marks, percentages, GPA, or IQ metrics exist. Ensure university names (if any remain) do not imply affiliation or enrollment.

## 6. Content to Rewrite/Reframe
- **Hero Messaging:** Move away from generic titles. Reframe around: "Building AI systems that cross the boundary between software and hardware."
- **Project Tiering:**
  - **Tier 1 (Flagships - 3-5):** Full case studies (LocalFlow, AUTOSTABI, etc.).
  - **Tier 2 (Research):** The markdown notes in `content/notes/` (e.g., Rudra Sentinel architectures).
  - **Tier 3 (Experiments):** The Archive list (GestureControl, etc.).
- **Tone:** Use objective, engineering-focused language. Instead of "revolutionizing," use "implemented," "measured," "refactored."

## 7. Information Architecture
- **`/` (Home):**
  - Boot Sequence (if not seen)
  - Hero (3D Core + Terminal Trigger + Command HUD)
  - Flagship Systems (Tier 1)
  - Lab Notes & Research (Tier 2 - dynamically fed from `content/notes/`)
  - Experiment Archive (Tier 3)
  - Timeline & Milestones
  - Capabilities & Feedback
  - Contact (mpranav126@outlook.com)
- **`/work/[slug]`:** Deep-dive case studies.
- **`/notes/[slug]`:** (NEW) Dedicated pages for the markdown engineering notes.

## 8. Visual Design System
- **Theme:** Dark, premium, high-contrast, technical.
- **Base:** `#07080A` (Near Black).
- **Surfaces:** `#0D0F14` (Level 1), `#121620` (Level 2).
- **Accents:** Vermilion (`#D94431`), Amber (`#F59E0B`), Emerald for success/verified states.
- **Grids:** Use `BlueprintGrid.tsx` globally but ensure it respects reduced motion.
- **Action:** Convert all hardcoded hex values in components to use CSS variables from `globals.css` or the Tailwind config.

## 9. Typography Rules
- **Primary:** Inter / sans-serif for UI.
- **Monospace:** JetBrains Mono or similar for telemetry, code, and technical labels.
- **Numerals:** Tabular figures (`tnum`) for all data, dates, and metrics.
- **Tracking:** Slight uppercase tracking (`tracking-widest`) for section headers and node labels.

## 10. Animation System
- **Philosophy:** Purposeful motion. No random glowing blobs.
- **Transitions:** Snappy, low-duration easing (e.g., `duration-200 ease-out`).
- **R3F Safety:** Strictly adhere to `AGENTS.md`. No DOM attributes on Three primitives. Always `next/dynamic` with `ssr: false`.
- **Accessibility:** ALL continuous animations (Canvas grids, 3D rotations) MUST pause or gracefully degrade if `@media (prefers-reduced-motion: reduce)` is active.

## 11. Component Architecture
- **Data Layer:** Single source of truth. Create a unified data fetching utility that can parse `content/notes/*.md` using `gray-matter` and `remark`.
- **UI Components:** Extract inline modals (like in `MilestonesSection`) into a reusable `<AccessibleModal>` that traps focus, handles `Escape`, and closes on backdrop click.
- **Icons:** Audit and remove all unused Lucide imports.

## 12. Homepage Spec
- **Boot Sequence:** Retain, but ensure smooth exit animation via `AnimatePresence`.
- **Hero:** Refined copy. Ensure the 5th flagship is mentioned. Fix the R3F missing font issue.
- **Projects:** Map directly to the unified data layer.

## 13. Case Study Spec (`/work/[slug]`)
- **Fixes:** Immediately patch the UTF-8 mojibake.
- **Structure:**
  1. Header (Status, Domain, GitHub link).
  2. The Constraint vs. Initial Approach.
  3. Architecture Dataflow (`<ArchitectureDiagram>`).
  4. Implementation Details (Code snippets).
  5. Measured Experiments (`<ExperimentCard>`).
  6. Failure Autopsy (`<WhatBrokeCard>`).
  7. Limitations & Next Steps.

## 14. Research / Experiments Spec
- **The Gap:** `content/notes/` contains valuable insights (e.g., "Rudra Sentinel" SLM tradeoffs, IMU noise).
- **The Fix:** Create a markdown parser utility. Build a new section component that reads these files and renders them as interactive "Lab Notes" on the homepage, linking to full `/notes/[slug]` pages.

## 15. Mobile Design Rules
- Ensure terminal modal is usable on small screens.
- Horizontal scrolling for architecture diagrams (`overflow-x-auto`) must not break the viewport.
- 3D scenes should scale down gracefully or swap to `EngineeringCoreFallback` if performance dips.

## 16. Accessibility Rules
- **Modals:** Must close on `Escape` and backdrop click. Must trap focus.
- **Buttons:** Semantic `<button>` tags with `aria-label` where text is absent.
- **Motion:** Respect `prefers-reduced-motion`.
- **Contrast:** Ensure all gray text on the `#07080A` background meets WCAG AA standards.

## 17. Performance & WebGL Rules
- Lazy load all R3F canvases.
- Throttle `requestAnimationFrame` in `BlueprintGrid` if the mouse is idle.
- Keep audio synthesis strictly client-side.

## 18. SEO & Meta Rules
- Update `metadataBase` in `layout.tsx` to the production URL once known (remove Vercel preview URL).
- Generate dynamic OpenGraph images for case studies.

## 19. Exact Files to Modify
- `package.json` (Remove unused `canvas-confetti`).
- `src/app/work/[slug]/page.tsx` (Fix Mojibake, update color classes).
- `src/data/portfolioContent.ts` (Merge with `portfolioData.ts`).
- `src/app/globals.css` & `tailwind.config.ts` (Sync color tokens).
- `src/components/hero/EngineeringCoreScene.tsx` (Fix font path).
- `src/components/timeline/EngineeringTimelineSection.tsx` (Extract hardcoded data).
- `src/components/ui/BlueprintGrid.tsx` (Add idle throttle and motion check).
- All components in `src/components/*`: Replace hardcoded hex colors, remove unused icons, fix modal accessibility.

## 20. Exact New Files to Create
- `src/lib/markdown.ts`: Utility to parse `content/notes/*.md`.
- `src/app/notes/[slug]/page.tsx`: Dynamic route for engineering notes.
- `src/components/ui/AccessibleModal.tsx`: Reusable modal wrapper.

## 21. Exact Files to Delete
- `src/data/portfolioData.ts` (After migrating data).
- `src/components/achievements/ProofModal.tsx`.
- `src/components/editorial/PersonalThesis.tsx`.
- Unused root assets: `*.docx`, loose `.png` files (or move to an un-tracked `_assets` folder).

## 22. Implementation Sequence
1. **Cleanup Phase:** Delete dead code, remove unused dependencies/icons, fix mojibake in case studies.
2. **Data Unification:** Merge `portfolioData.ts` into `portfolioContent.ts`. Implement `src/lib/markdown.ts` to parse `content/notes/`.
3. **Design System Sync:** Align `tailwind.config.ts`, `globals.css`, and component hex codes.
4. **Component Refactor:** Implement `AccessibleModal`, update all modals to use it. Fix `BlueprintGrid` performance.
5. **Route Creation:** Build `/notes/[slug]` route and link it from the homepage.
6. **Hero & Content Updates:** Refine hero copy, fix missing R3F fonts, ensure all 5 flagships are accurately represented.

## 23. Validation Checklist
- [ ] `npm run build` succeeds with 0 errors.
- [ ] No UTF-8 encoding errors on case study pages.
- [ ] Modals close via `Escape` key and backdrop click.
- [ ] Terminal opens via `~` and commands work.
- [ ] Markdown notes from `content/notes/` render correctly.
- [ ] Zero instances of school marks or affiliations.
- [ ] Color palette is strictly unified.

## 24. Risks & Mitigations
- **Risk:** R3F SSR crashes during build. **Mitigation:** Strict enforcement of `next/dynamic` and `ssr: false`.
- **Risk:** Markdown parsing errors. **Mitigation:** Use robust `gray-matter` parsing with fallback metadata.

## 25. Final Acceptance Criteria
The portfolio must look and function like a high-end engineering laboratory console. It must be completely navigable, accessible, fast, and free of the identified technical debt, presenting the 5 flagships and the markdown research notes cohesively.

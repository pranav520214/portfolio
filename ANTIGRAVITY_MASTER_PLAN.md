# ANTIGRAVITY MASTER PLAN
**Target System**: Pranav Kumar Mishra Production Portfolio (`pranav520214/portfolio`)  
**Design Paradigm**: Classified Engineering Laboratory × Advanced Telemetry Console × Deep-Tech Command Interface  
**Primary Contact Email**: `mpranav126@outlook.com`  
**Core Motif**: SIGNAL / CORE / NODE (Silicon • Software • Physical Systems)

---

## 1. Repository Audit

### Current Architecture & Stack
- **Framework**: Next.js 14.2.5 (App Router, static generation enabled)
- **UI & Runtime**: React 18.3.1, TypeScript 5.4.5, Tailwind CSS 3.4.4
- **3D / WebGL**: Three.js r165, `@react-three/fiber` 8.16.8, `@react-three/drei` 9.106.0
- **Motion & Sound**: Framer Motion 11.2.10, procedural Web Audio API synthesis (`SoundSystem.ts`, muted by default)
- **Icons & Visuals**: Lucide React 0.395.0, procedural Canvas 2D blueprint grid (`BlueprintGrid.tsx`)
- **Data Layers**:
  - `src/data/portfolioData.ts` (537 lines: Personal profile, 5 flagship projects, achievements, tech items, brain nodes)
  - `src/data/portfolioContent.ts` (902 lines: Detailed architecture nodes, hypotheses, test setups, failure autopsies, code snippets, milestones, external correspondence, capability breakdowns)
  - `content/notes/*.md` (6 markdown engineering field notes on ASR buffer ownership, rocket launch thermodynamics, IMU vibration, solver stiffness, etc.)
  - `public/certificates/*` (10 verified documentary proof images: STEM-A-THON, Space Olympiad, ISRO HQ correspondence, IIT Delhi faculty appreciation, Confluence 2.0, Samsung Solve for Tomorrow, etc.)

### Current Problems & Gaps Identified
1. **Hero Section 2D Static Placeholder**: The hero currently renders a static PNG image (`/hero/hero-main.png`) inside a 4:3 box instead of an interactive 3D WebGL experience. The directive explicitly requires "The first viewport should contain a high-quality Three.js / React Three Fiber experience — THE ENGINEERING CORE."
2. **Disconnected Theme & Component Segregation**:
   - `MilestonesSection.tsx`, `EngineeringNotebookSection.tsx`, `QuestionsSection.tsx`, `ExternalFeedbackSection.tsx`, and `ExperimentArchiveSection.tsx` were built with light editorial paper styles (`#FFFFFF`, `#FAF9F5`, `#111111`) while `page.tsx` was switched to dark mode (`#0D0F12`), causing those rich sections to be excluded from the main page.
   - Valuable documented work (ISRO correspondence, IIT Delhi review, secondary experiments like `GestureControl`, `Beyond Tin and Lasers`, `terminal-lyric-sync-player-`) is currently not surfaced on the homepage.
3. **Old Contact Information Reference**: `portfolioData.ts` contained `pranav520214@gmail.com`. The user directive strictly requires `mpranav126@outlook.com` across all mailto links, contact dispatches, structured metadata, and footers.
4. **Motion System Inconsistency**: Animations in several components use disjointed Framer Motion variants and lack unified easing curves, weighted physical transitions, clip-path reveals, and coordinated entrance timing.
5. **Secondary Projects Left Empty**: `ARCHIVE_PROJECTS` in `portfolioContent.ts` is currently an empty array (`[]`), despite public GitHub repositories existing for `GestureControl`, `Beyond-Tin-and-Lasers`, and terminal experiments.

---

## 2. Visual Direction & Aesthetic Language

### Atmosphere
- **Concept**: Digital command console of a private high-consequence skunkworks laboratory operating across local AI, embedded firmware, flight avionics, and mathematical simulation.
- **Tone**: Rigorous, quiet, secretive, highly disciplined, instrumented, evidence-backed. No cartoon SaaS gradients, no purple/blue generic "AI orb" clichés, no fake military or hacker gimmicks.

### Color Hierarchy
- **Environment Backgrounds**:
  - `lab-black`: `#07080A` (Deepest viewport void)
  - `lab-surface`: `#0D0F14` (Console chassis)
  - `lab-panel`: `#121620` (Subsystem housings)
  - `lab-card`: `#161B26` (Instrument cards)
  - `lab-border`: `rgba(255, 255, 255, 0.08)` (Structural hairlines)
  - `lab-border-active`: `rgba(217, 68, 49, 0.35)` (Active signal channels)
- **Primary Accent**:
  - `vermilion / signal red`: `#D94431` (Critical node states, active execution lines, core telemetry)
  - `bright vermilion`: `#FF4D36` (Hover focus)
- **Secondary Accent**:
  - `industrial yellow`: `#F59E0B` (Warning gates, calibration markers, status badges)
  - `electric gold`: `#FFE600` (Signal lock indicators)
- **Tertiary Accent**:
  - `data blue / cold cyan`: `#38BDF8` / `#0284C7` (Sensors, loopback IPC, bus traces)
  - `phosphor green`: `#10B981` (Validated benchmark checks, pass states)
- **Typography & Ink**:
  - `tech-white`: `#F1F5F9` (Primary telemetry and headings)
  - `tech-muted`: `#94A3B8` (System commentary and descriptions)
  - `tech-faint`: `#64748B` (Annotation labels and coordinates)

---

## 3. WebGL Architecture: "The Engineering Core"

### Concept & Physicality
The Hero 3D scene represents **THE ENGINEERING CORE**—an abstract, suspended computational machine within an illuminated dark chamber:
- **Central Silicon Layer**: Multi-stage wafer structure with micro-etched logic channels (`MeshStandardMaterial`, roughness: 0.25, metalness: 0.85).
- **Photonic & Optical Wave Paths**: Layered glowing fiber pathways routing data between computation modules (`MeshPhysicalMaterial` with transmission: 0.6, roughness: 0.1, emissive vermilion/amber).
- **Metallic Structural Cage & Stator Rings**: Precision-machined aluminum support frames rotating with subtle differential angular velocities (`MeshStandardMaterial`, metalness: 0.95, roughness: 0.15).
- **Geometric Data Nodes**: 5 satellite sub-assemblies floating in synchronized orbit representing the 5 core domains:
  1. *Local AI Core* (CUDA streaming matrix)
  2. *Avionics Module* (MPU6500 IMU gimbal & flight trim)
  3. *BLE HID Interface* (Optical wand transducer)
  4. *Dynamic Solver Reactor* (Coupled ODE compartmental lattice)
  5. *Signal Conditioning Gate* (Microsecond interrupt timer)
- **Volumetric Depth & Particle Signals**: Subtle drift particles and signal packets traveling along spline coordinates, illuminating upon user interaction.

### Camera & Cinematography
- **Cinematic Entrance (1.8s)**:
  1. `t = 0.0s`: Deep black chamber, cold diagnostic HUD indicators activate (`LOCAL NODE ONLINE`, `CALIBRATING GYRO BIAS`).
  2. `t = 0.4s`: Stator rings spin up, faint silhouette emerges as directional key light strikes the core.
  3. `t = 0.9s`: Photonic pathways illuminate in vermilion/amber; camera dollies in smoothly from `z: 9` to `z: 5.5`.
  4. `t = 1.8s`: Core settles into quiescent idle state with fluid, damped pointer parallax.
- **Damped Pointer Interaction**: Subtle camera yaw/pitch ($\pm 3^\circ$) and light coordinate tracking with `THREE.MathUtils.damp` (damping factor 0.05).
- **Scroll Response**: As the user scrolls past the hero, the core smoothly expands its orbital radius, allowing individual modules to align with the active section.

### R3F Critical Safety Compliance
- **Zero DOM attributes on Three.js primitives**: strictly attach `data-cursor` and DOM identifiers to outer HTML `div` containers.
- **Dynamic Client Loading**: Loaded via `next/dynamic(() => import(...), { ssr: false })` with a skeleton loader.
- **Adaptive Quality (GPU Budget)**:
  - Desktop: DPR capped at 1.5.
  - Mobile / Tablets: DPR capped at 1.0, geometry segments reduced, particle count lowered by 65%.
  - `prefers-reduced-motion`: Disables continuous rotation, skips camera entrance, renders static high-precision camera pose.
  - Offscreen optimization: `IntersectionObserver` halts `useFrame` updates when hero is out of view.

---

## 4. Animation & Motion Architecture

- **Engine**: Framer Motion 11 + CSS Hardware Acceleration.
- **Unified Motion Tokens**:
  - `transition-snappy`: `duration: 0.35, ease: [0.16, 1, 0.3, 1]` (mechanical instrument response)
  - `transition-cinematic`: `duration: 0.75, ease: [0.25, 1, 0.5, 1]` (weighted reveals, camera moves)
  - `spring-tactile`: `type: "spring", stiffness: 350, damping: 30`
- **Techniques**:
  - `clip-path` polygon reveals for telemetry titles and section dividers.
  - Hairline scan-line reveal on card hover.
  - Micro-stepped telemetry counters for numbers and benchmarks.
  - Accessible `prefers-reduced-motion: reduce` overrides globally disabling all non-essential motion.

---

## 5. Information Architecture & Section Hierarchy

1. **`00 // SYSTEM HUD & NAVIGATION`**:
   - Telemetry status (`ONLINE // 500Hz REALTIME`), Quick jump links, Audio mute switch, CLI trigger (`[~]`), GitHub repo.
2. **`01 // HERO: THE ENGINEERING CORE`**:
   - 3D React Three Fiber scene composited into deep negative space.
   - Positioning statement: *PRANAV KUMAR MISHRA — BUILDING INTELLIGENT SYSTEMS ACROSS SOFTWARE, SILICON AND THE PHYSICAL WORLD*.
   - Quick telemetry chips (Local AI • Avionics • Embedded • Simulation • 5 Verified Repositories).
3. **`02 // SELECTED SYSTEMS (FLAGSHIP RESEARCH PROGRAMS)`**:
   - The 5 verified flagships:
     - **01 LocalFlow**: Private Desktop Dictation & Prompt Engineering (NeMo-Speech.cpp + llama.cpp, 4GB VRAM).
     - **02 AUTOSTABI**: Fixed-Wing Flight Stabilizer (ESP32, 500Hz MPU6500 loop, WebSocket Ground Station).
     - **03 ESP32 BLE Wand Mouse**: 6-DOF Handheld Air Mouse (Optical touch, Kalman filter, NVS calibration).
     - **04 PRIVAVEDA**: Local-First Mechanistic Dynamic Simulation (SciPy Radau/BDF stiff solver, Pint, Bayesian MAP, Monte Carlo).
     - **05 FS-i6X BLE Controller**: Hardware Signal Bridge (Microsecond GPIO rising-edge interrupts, PPM to BLE Gamepad).
   - Interactive Architecture Diagram, Experiment Benchmarks, Failure Autopsies ("What Broke").
4. **`03 // HARDWARE & FIRMWARE EXPLODED SUBSYSTEM`**:
   - Interactive 3D layer visualizer (`ExplodedViewVisualizer`) with separation axis slider, inspecting PCB layers, RF shielding, and bus lines.
5. **`04 // HOW I BUILD (5-STAGE METHODOLOGY)`**:
   - `01 IDEA` (Constraint) → `02 ARCHITECT` (Dataflow) → `03 BUILD` (Microsecond Prototypes) → `04 BREAK` (Stress Testing) → `05 ITERATE` (Deterministic Gates).
6. **`05 // EXPERIMENT ARCHIVE & SECONDARY PROGRAMS`**:
   - Systematic engineering dossier of secondary prototypes:
     - *GestureControl* (Python 3.11, MediaPipe HandLandmarker, local CPU inference, global control hooks).
     - *Beyond Tin and Lasers* (Electromagnetic launch physics & atmospheric entry modeling).
     - *Terminal Sync Player* (Microsecond terminal-based audio/lyric synchronization engine).
     - *Privantrix Aerospace* (High-altitude velocity assist conceptual studies).
7. **`06 // ENGINEERING NOTEBOOK & RESEARCH QUESTIONS`**:
   - Tabbed laboratory logbook of field notes and active hypotheses (ASR stream ownership, MEMS sensor vibration harmonics, stiff ODE solver collapse, etc.).
8. **`07 // DOCUMENTARY RECORDS & MILESTONES`**:
   - Verified competitions, government/academic reviews, and programs with primary proof modal:
     - STEM-A-THON 2026 Rank #56 (Robocraze)
     - Indian Space Olympiad 2026 (92nd Percentile, AIR 47 Advanced, AIR 24 Class XI)
     - ISRO Science Programme Office Correspondence (Concept appraisal)
     - IIT Delhi Faculty Showcase Commendation (Systems thinking award)
     - Confluence 2.0 Global Top 100
     - Samsung Solve for Tomorrow 2026
     - AI for Bharat (IIIT Delhi)
     - Strict verification: Zero grade percentages, zero marks, zero implied university admissions.
9. **`08 // TECHNICAL CAPABILITIES (ENGINEERING STACK)`**:
   - Grouped into 4 concrete domains: Local AI & Speech, Desktop Systems, Embedded & Avionics, Scientific Simulation. No arbitrary skill bars.
10. **`09 // ABOUT & WORKING PRINCIPLES`**:
    - Concise perspective of a student engineer dedicated to first-principles prototyping, memory-conscious systems, and open verification.
11. **`10 // OPEN CHANNEL / CONTACT & FOOTER`**:
    - Central signal node state.
    - Public contact email: `mpranav126@outlook.com`.
    - Native `mailto:` link accessible with JavaScript disabled.
    - Verified links to GitHub, LinkedIn, X, Instagram.

---

## 6. Component Plan: Modifications, Additions & Retirements

### Files to Modify
- `src/data/portfolioData.ts`:
  - Update email strictly to `mpranav126@outlook.com`.
  - Update headline and identity copy to match technical positioning.
- `src/data/portfolioContent.ts`:
  - Populate `ARCHIVE_PROJECTS` with verified projects (`GestureControl`, `Beyond Tin and Lasers`, `Terminal Sync Player`, `Privantrix Aerospace`).
  - Refine milestone descriptions for strict compliance (no grades/percentages).
- `src/app/globals.css`:
  - Add dark command console utility classes, telemetry monospace typography, scanlines, and glow gradients.
- `src/app/layout.tsx`:
  - Enhance SEO metadata, OpenGraph cards, schema markup, and canonical tags.
- `src/app/page.tsx`:
  - Wire all unified sections into the cohesive command console experience.
- `src/components/navbar/Navbar.tsx`:
  - Transform into an instrument panel navigation bar with real-time status telemetry, audio toggle, and CLI hotkey indicator.
- `src/components/hero/HeroSection.tsx`:
  - Replace 2D image placeholder with dynamic `EngineeringCoreScene` client component.
- `src/components/contact/ContactSection.tsx`:
  - Set recipient email to `mpranav126@outlook.com`, ensure native JS-free mailto link works seamlessly, align visuals with dark command theme.
- `src/components/achievements/MilestonesSection.tsx`:
  - Re-theme from light paper to dark lab telemetry panel with instant proof viewer.
- `src/components/notebook/EngineeringNotebookSection.tsx`:
  - Re-theme to dark command notebook cards with modal drawer inspection.
- `src/components/editorial/QuestionsSection.tsx`:
  - Re-theme to dark command research inquiries.
- `src/components/feedback/ExternalFeedbackSection.tsx`:
  - Re-theme to dark command critique dossiers with primary document viewer.
- `src/components/projects/ExperimentArchiveSection.tsx`:
  - Connect to newly populated `ARCHIVE_PROJECTS` in dark telemetry table format.

### Files to Create
- `src/components/hero/EngineeringCoreScene.tsx`:
  - High-craft React Three Fiber scene rendering the suspended 3D computational machine with layered wafers, photonic transmission conduits, orbiting domain nodes, and damped camera rig.
- `src/components/hero/EngineeringCoreFallback.tsx`:
  - Ultra-lightweight SVG/Canvas fallback for reduced-motion and low-end mobile environments.
- `src/components/ui/TelemetryBadge.tsx`:
  - Reusable military/industrial-style telemetry indicators (`STATUS`, `FREQUENCY`, `STAGE`).
- `src/components/ui/SectionHeading.tsx`:
  - Consistent engineering section header with index numerals, classification labels, and status badges.
- `src/components/timeline/EngineeringTimelineSection.tsx`:
  - Chronological systems build history (2025–2026 milestones, firmware releases, and competition deployments).

### Files to Retire / Replace
- Outdated light-editorial inline style overrides in `src/components/achievements/*`, `src/components/editorial/*`, and `src/components/notebook/*` replaced with unified dark console design tokens.

---

## 7. Performance, Mobile & Accessibility Strategy

### Performance & GPU Budget
- Three.js scenes dynamically imported with `{ ssr: false }`.
- Adaptive DPR: 1.0 on mobile, max 1.5 on high-density desktop displays.
- Shared geometries and materials; procedural generation to eliminate huge GLB download payloads.
- Automatic pause of animation loops when canvas is scrolled out of viewport (`IntersectionObserver`).
- Zero unnecessary React re-renders inside R3F `useFrame`.

### Mobile Responsiveness
- Tested form factors: 320px, 375px, 390px, 430px (iPhone / Pixel / Galaxy), 768px (iPad), 1280px, 1440px, 1920px.
- Mobile hero renders a streamlined core geometry with simplified lighting to preserve 60fps.
- Mobile navigation uses a dedicated full-width instrument tray with large touch targets.
- Zero horizontal overflow (`overflow-x: hidden`).

### Accessibility & Reduced Motion
- Semantic HTML tags (`<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`).
- Full keyboard focusability with visible outline states on all interactive elements.
- `@media (prefers-reduced-motion: reduce)` automatically terminates 3D camera animations and Framer Motion spring delays.
- Screen readers receive descriptive labels, ARIA landmarks, and fallback text for all 3D diagrams and certificates.

---

## 8. Implementation Phases

- **Phase 1**: Data & Metadata Hygiene (Update contact email to `mpranav126@outlook.com`, populate archive projects, verify zero grade marks).
- **Phase 2**: Hero WebGL Engineering Core (Implement `EngineeringCoreScene.tsx` with physical materials, photonic pathways, orbiting nodes, cinematic camera entry, and fallback).
- **Phase 3**: Re-theming & Unification of Secondary Sections (Transform Milestones, Notebook, Feedback, Questions, and Archive into dark console format).
- **Phase 4**: Engineering Timeline & Subsystem Integration (Add Chronological Timeline, integrate ExplodedViewVisualizer).
- **Phase 5**: Navigation, Audio & CLI HUD Polish (Instrument panel navbar, procedural audio hooks, command terminal refinement).
- **Phase 6**: Verification & Hardening (`npm run build`, linting, responsiveness audit, cross-browser check, performance validation).

---

## 9. Final Acceptance Checklist
- [ ] Existing architecture and libraries preserved (Next.js 14 App Router, R3F, Drei, Tailwind, Framer Motion)
- [ ] `AGENTS.md` and `CLAUDE.md` rules respected (no DOM attributes on Three primitives; dynamic SSR false)
- [ ] Original classified laboratory design language established
- [ ] 3D Hero WebGL implemented: "The Engineering Core" (procedural, physical, symbolic)
- [ ] Entrance camera sequence is cinematic yet rapid (< 2s)
- [ ] Flagship projects (5) dominate hierarchy
- [ ] Secondary projects cleanly organized into Experiment Archive
- [ ] Contact email everywhere is `mpranav126@outlook.com`
- [ ] Absolutely no school marks, percentages, or GPA scores in public UI
- [ ] No university affiliation claimed; only aspirations and verified research correspondence
- [ ] Zero private repository secrets exposed
- [ ] Device capability adaptation and `prefers-reduced-motion` compliance verified
- [ ] Production build (`npm run build`) passes cleanly with 0 errors
- [ ] `ANTIGRAVITY_IMPLEMENTATION_REPORT.md` generated upon completion

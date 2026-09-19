# ANTIGRAVITY ANIMATION PLAN

> Authored by: OPUS (Lead Creative Director & Animation Architect)
> Date: 2026-09-18
> Repository: pranav520214/portfolio
> Stack: Next.js 14, React 18, TypeScript, Three.js 0.165, R3F 8.16.8, Drei 9.106, Framer Motion 11.2.10

---

## 1. Visual Narrative

The portfolio is a single authored visual journey — not a collection of independent animated sections.

**Emotional arc:**
1. **Darkness → Discovery** — The visitor arrives in near-total darkness. Points of light emerge. Language forms. A multilingual constellation network becomes alive.
2. **Threshold → Entry** — Semiconductor gate structures charge and open. The camera passes through hardware architecture into the engineering world.
3. **Identity → Authority** — Pranav's portrait resolves within a living technical environment. Name and positioning crystallize.
4. **Philosophy → Craft** — Engineering methodology assembles letter-by-letter, conveying precision.
5. **Gallery → Inspection** — Projects hang physically in space. One is selected, pulled forward, opened like an engineering folio.
6. **Capability → Revelation** — Hands emerge to reveal layered technical domains.
7. **Trajectory → Ambition** — Privantrix and future research form a connected systems graph.
8. **Resolution → Contact** — Everything resolves to an open communication channel.

---

## 2. Scene Timeline

| Sequence | Duration | Trigger | WebGL | DOM |
|---|---|---|---|---|
| Constellation | 4–7s | Auto (page load) | ✓ Full scene | Skip button only |
| Gate Transition | 1.5–2.5s | Auto (after constellation) | ✓ Continuation | None |
| Hero Reveal | 0.8–1.2s | Auto (after gate) | ✓ Background | Full DOM hero |
| Scroll sections below | User-driven | Scroll | Contextual | Primary |

---

## 3. Intro Constellation

### 3.1 Concept
A dark WebGL canvas. Small luminous nodes activate sequentially, forming a network that spells/represents multilingual greetings: HELLO, नमस्ते, 你好, BONJOUR.

### 3.2 Node System
- **Small nodes:** 2–4px radius, white/warm white, ~60–80 total
- **Medium nodes:** 5–8px radius, slight color tint, ~15–20 total
- **Anchor nodes:** 10–14px radius, correspond to language anchors, 4 total
- Point sizes vary naturally using noise-based scale modulation

### 3.3 Node Activation Sequence
```
t=0.0s    First node appears (barely visible → softly glows → settles)
t=0.6s    Second node appears
t=0.9s    Edge illuminates between nodes 1–2 (traveling light pulse)
t=1.2s    Cluster of 3 nodes appears simultaneously
t=1.5s    "HELLO" region begins forming
t=2.2s    "नमस्ते" region begins
t=3.0s    Parallel activation accelerates
t=3.5s    "你好" and "BONJOUR" regions form
t=4.5s    All connections complete — constellation breathes
t=5.0s    Brief hold — full constellation visible
t=5.5s    Gate transition begins
```

Delays vary between 0.3s–1.5s. Not metronomic.

### 3.4 Connection Animation
- Lines draw progressively using a shader-based progress uniform (0→1)
- A traveling light pulse moves along each edge after it appears
- Glow: emissive additive blending, subtle, ~0.3 intensity
- Think: electric signal on a circuit trace, not Christmas lights

### 3.5 Node Lighting Lifecycle
```
opacity: 0.0 → 0.15 (appear)
         0.15 → 1.0 (intensify, ~200ms)
         1.0 → 0.4 (settle, ~600ms)
         0.4 (idle breathing ±0.1)
```

### 3.6 Greeting Typography
- Labels appear as subtle monospace text positioned near anchor nodes
- Not flat HTML — rendered as Three.js `Text` from Drei (using system font, no external woff)
- Labels appear after their constellation cluster forms, with opacity 0→0.7 over 400ms
- Labels remain subtle — constellation structure is primary

### 3.7 Skip & Session
- **Skip button:** Top-right, `[ SKIP ]`, always visible
- **Session optimization:** `sessionStorage.setItem('ag_intro_seen', 'true')` — subsequent visits skip to hero with a 0.5s fade-in
- **Reduced motion:** Skip directly to hero with a simple 0.8s opacity fade

### 3.8 Implementation
- Component: `src/components/intro/ConstellationIntro.tsx` (NEW)
- Uses R3F Canvas with `frameloop="demand"` initially, switching to `"always"` during activation
- Custom `BufferGeometry` for points, `ShaderMaterial` for edges
- Node data defined as typed arrays: `[x, y, z, activationTime, size, group]`

---

## 4. Gate Opening Transition

### 4.1 Concept
The constellation is viewed through the interior of a semiconductor package. Metallic traces, silicon surfaces, and gate-like geometric structures surround the constellation. At transition:
1. Electrical paths along traces activate (emissive pulse)
2. Gate panels begin separating (hinge-like rotation)
3. Camera dollies forward
4. Aperture widens
5. Camera passes through
6. Hero world fades in behind

### 4.2 Gate Geometry
- Two primary gate panels: flat rectangular meshes with beveled edges
- Material: dark metallic (`metalness: 0.95, roughness: 0.15`)
- Surrounding frame: thin geometric traces (extruded line geometry)
- Optional: small pin/pad details on gate surfaces (instanced small cylinders)

### 4.3 Gate Physics
- Panels rotate on Y-axis (like hinged doors opening outward)
- Easing: `easeInOutCubic` with slight overshoot (spring-like settle)
- Left panel leads by ~100ms; right panel follows
- Subtle vibration on contact: high-frequency low-amplitude sine oscillation over 200ms
- Light response: as gates open, a bright backlight from hero world floods through the widening gap

### 4.4 Camera Choreography
```
t=0.0s    Camera at constellation viewing position
t=0.3s    Slight dolly forward begins (z: 5.0 → 4.0)
t=0.6s    Gate panels begin opening
t=1.2s    Camera accelerates gently (z: 4.0 → 1.5)
t=1.6s    Depth blur increases, light floods
t=2.0s    Camera passes through aperture (z: 1.5 → -1.0)
t=2.2s    WebGL scene cross-fades to hero DOM
t=2.5s    Constellation canvas unmounts
```

### 4.5 Implementation
- Component: `src/components/intro/GateTransition.tsx` (NEW)
- Integrated into same Canvas as constellation (shared scene)
- Gate meshes pre-positioned but invisible until transition triggers
- Camera animation via `useFrame` with damped interpolation

---

## 5. Hero Reveal

### 5.1 Concept
After gate transition, the main portfolio appears. The hero section features:
- Pranav's portrait (existing `/public/hero/hero-portrait.png`)
- Technical positioning text
- Semiconductor-inspired WebGL background (evolved from existing `EngineeringCoreScene`)
- Navigation CTAs

### 5.2 Portrait Treatment
- Portrait appears from slight darkness using opacity + subtle scale (0.95→1.0)
- Edge lighting effect via CSS `box-shadow` or SVG filter (warm rim light)
- Subtle parallax on scroll (portrait moves at 0.85x scroll rate)
- No distortion of the real portrait

### 5.3 Hero WebGL Background
- Retain the existing ReactorCore + StatorGimbals concept from `EngineeringCoreScene.tsx`
- Remove the satellite navigation nodes (they serve a different purpose now)
- The reactor becomes a background ambient element behind the portrait/text
- Reduce to background role: lower opacity, less interactive

### 5.4 Implementation
- `src/components/hero/HeroSection.tsx` (MODIFY)
- `src/components/hero/EngineeringCoreScene.tsx` (MODIFY — simplify to background role)
- Remove the missing `/fonts/inter.woff` reference — use Drei `Text` without explicit font (fallback to system)

---

## 6. Engineering Philosophy Typography

### 6.1 Statement
Source from repository data — `HOW_I_BUILD_STEPS` contains the pipeline:
> IDEA → ARCHITECT → BUILD → BREAK → ITERATE

Animated statement:
> **BUILD. TEST. FAIL. MEASURE. REBUILD.**

### 6.2 Letter Construction
- Each letter is initially positioned with slight random offset (±20px X, ±15px Y, ±8° rotation)
- On scroll into viewport, letters animate to final baseline position
- Spring physics: `stiffness: 180, damping: 22`
- Staggered: ~40ms between letters
- All letters monospace font, large (clamp(3rem, 6vw, 6rem))
- Final state: perfectly aligned, fully opaque, no rotation

### 6.3 Implementation
- Component: `src/components/editorial/EngineeringPhilosophy.tsx` (NEW)
- Uses Framer Motion `useInView` + individual `motion.span` per character
- Scroll-triggered, not time-triggered

---

## 7. Suspended Project Gallery

### 7.1 Concept
Projects hang from a thin technical wire stretched across the viewport. Each card is attached via a small clip. Cards have subtle idle sway.

### 7.2 Wire
- Single horizontal Bezier curve, slight natural droop
- Rendered as a thin SVG path or CSS pseudo-element
- Color: `#475569` (steel gray)
- Width: 1.5px

### 7.3 Cards
- 5 flagship projects from `FLAGSHIP_PROJECTS`
- Each card: 280×380px, dark panel, rounded corners
- Attachment point: small metallic clip shape at top center
- Content: project title, domain badge, status indicator, key visual

### 7.4 Physics
- Idle: subtle CSS `transform: rotate(var(--sway))` with sine-wave oscillation (±1.5°, period 3–5s, phase-offset per card)
- Scroll response: slight forward tilt toward scroll direction (±2° on Y-axis)
- Pointer proximity: nearest card tilts slightly toward cursor

### 7.5 Implementation
- Component: `src/components/projects/SuspendedGallery.tsx` (NEW)
- Primarily DOM/CSS + Framer Motion (not R3F — text readability matters)
- Wire as SVG `<path>` with Bezier control points
- Cards positioned along the wire using CSS transforms

---

## 8. Project Book Interaction

### 8.1 Selection Sequence
```
1. User clicks a suspended card
2. Other cards fade (opacity → 0.2)
3. Selected card detaches animation (clip releases)
4. Card moves to viewport center (Framer Motion layout animation)
5. Card scales up (1.0 → 1.4)
6. Card rotates to face-on position
7. Card transforms into book (3D perspective transform)
8. Front cover opens (rotateY 0° → -160°)
9. Book content appears
```

### 8.2 Book Structure
- CSS 3D transforms with `perspective: 1200px`
- Cover: front face of the project card, transforms on Y-axis hinge
- Pages: stacked DOM elements with slight `translateZ` offset
- Page turn: swipe or click, animates `rotateY` with ease-out
- Shadow under book: elliptical gradient, scales during open/close

### 8.3 Book Pages (per project)
Only include pages with actual data from `FLAGSHIP_PROJECTS`:
1. **Identity** — title, domain, year, status
2. **Problem** — research question
3. **Architecture** — node/step diagram
4. **Experiments** — experiment cards (if present)
5. **Results** — key metrics and outcomes
6. **Source** — GitHub CTA (if public URL exists)

### 8.4 Close Sequence
```
1. User clicks close / presses Escape
2. Book pages close
3. Cover closes
4. Book shrinks (1.4 → 1.0)
5. Card returns to exact original hanging position
6. Clip reattaches
7. Other cards fade back (opacity → 1.0)
8. Focus returns to gallery
```

### 8.5 Keyboard Support
- `Escape` closes book
- `ArrowLeft/ArrowRight` turns pages
- Focus trapped in book when open
- Close returns focus to originating card

### 8.6 Implementation
- Component: `src/components/projects/ProjectBook.tsx` (NEW)
- CSS 3D transforms + Framer Motion for sequencing
- Preserves existing `/work/[slug]` routes as canonical detail pages (book is an enhancement, not a replacement)

---

## 9. Skills Hands Composition

### 9.1 Concept
Stylized hands (procedural 3D or SVG silhouettes) emerge from behind layered panels, opening to reveal skill domain tokens.

### 9.2 Hand Design
- Procedural: flat silhouette shapes with slight 3D depth
- Material: dark with edge highlight (rim lighting)
- 2 primary hands, positioned left and right of center
- Animation: closed → gradually opening → palm-up reveal

### 9.3 Skill Tokens
- Small geometric shapes (hexagons, circles, diamonds) per skill domain
- 6 domains from verified portfolio data:
  - AI & ML
  - Embedded Systems
  - Hardware & Avionics
  - Web & Desktop Systems
  - Scientific Computing
  - Aerospace Research
- Tokens appear at varying depths, angles, and scales
- Each token has a label and supporting technology list

### 9.4 Implementation
- Component: `src/components/capabilities/SkillsHands.tsx` (NEW)
- Framer Motion for hand/token animation (DOM-based for text readability)
- SVG hand silhouettes, animated via `motion.path` or `motion.g`
- Scroll-triggered

---

## 10. Privantrix Section

### 10.1 Content
From repository data (line 645–653 of `portfolioContent.ts`):
- **Title:** Privantrix Aerospace — Concept Study & Trajectory Modeling
- **Domain:** Aerospace Systems • Trajectory Simulation
- **Summary:** Early aerospace concept modeling and staging trajectory simulation. Received encouraging formal correspondence from the ISRO Science Programme Office.
- **Status:** ARCHIVED
- **No verified website URL found** — do not fabricate one

### 10.2 Presentation Sequence
```
1. Section enters viewport
2. Logo outline traces (SVG path animation)
3. Signal fills the symbol (gradient sweep)
4. "PRIVANTRIX" wordmark appears (opacity + tracking expansion)
5. "AEROSPACE" subtitle fades in
6. Mission statement resolves
7. ISRO correspondence reference appears subtly
```

### 10.3 Implementation
- Component: `src/components/privantrix/PrivantrixSection.tsx` (NEW)
- SVG logo (create simple geometric aerospace mark)
- Framer Motion scroll-triggered sequence

---

## 11. Vision / Future Section

### 11.1 Content
Research directions derived from verified portfolio data:
- **AI Systems** — Local inference, on-device ASR (ACTIVE)
- **Embedded Intelligence** — Microcontroller firmware, sensor fusion (ACTIVE)
- **Aerospace** — Trajectory simulation, propulsion concepts (EXPLORING)
- **Scientific Computing** — Stiff ODE solvers, Bayesian calibration (ACTIVE)
- **Robotics** — Hardware prototyping, motion control (EXPLORING)
- **Advanced Computing** — GPU compute, systems programming (RESEARCHING)

### 11.2 Visualization
- Future-systems graph: 6 nodes in 3D space connected by edges
- Each node has label + status badge
- Edges represent interdisciplinary connections
- Implemented as a lightweight R3F scene or DOM-based with CSS 3D

### 11.3 Implementation
- Component: `src/components/vision/VisionSection.tsx` (NEW)
- Lightweight R3F or Framer Motion + CSS 3D (evaluate performance)

---

## 12. Scroll Architecture

### 12.1 Strategy
- Primary scroll: native browser scroll (`scroll-smooth` on `<html>`)
- Scroll-driven animations: Framer Motion `useScroll` + `useTransform`
- WebGL camera changes: R3F `useFrame` reads scroll position via shared ref
- Section visibility: `IntersectionObserver` with threshold arrays

### 12.2 Performance Rules
- **Never** setState on every scroll event
- Use Framer Motion `motionValue` for scroll-linked transforms
- R3F scenes use `frameloop="demand"` when static, `"always"` during animation
- Off-screen R3F canvases: pause rendering entirely

### 12.3 Section Transitions
- Each section transition uses a consistent pattern:
  - Previous section fades slightly (opacity 1.0 → 0.92)
  - New section slides up with slight parallax offset
  - No hard cuts between sections

---

## 13. WebGL Architecture

### 13.1 Canvas Strategy
- **Intro Canvas:** Full-screen, contains constellation + gate. Unmounts after hero reveal.
- **Hero Canvas:** Background element behind hero DOM. Contains simplified reactor/ambient scene.
- **Vision Canvas (optional):** Small inline canvas for future-systems graph, or use DOM instead.
- All other scenes: DOM + CSS 3D + Framer Motion (for text readability)

### 13.2 R3F Rules (from AGENTS.md)
- No `data-*` attributes on Three.js primitives
- `'use client'` on all files with Canvas/Three.js/Framer imports
- `dynamic(() => import(...), { ssr: false })` for Canvas mounting
- DOM wrapper `<div data-cursor="3d">` for cursor attributes

### 13.3 Shader Strategy
- Constellation edges: custom `ShaderMaterial` with `uniform float progress` for draw animation
- Gate surfaces: metallic PBR with emissive channel keyed to activation state
- Node glow: additive blending point shader with per-point size/opacity attributes
- Keep all shaders in their respective component files (no separate .glsl unless shared)

### 13.4 Lighting (Intro Scene)
- Ambient: 0.05 intensity (near-dark)
- No directional lights (nodes self-illuminate via emissive materials)
- Gate transition: add a bright directional light behind gate that ramps from 0→3.0 intensity

### 13.5 Lighting (Hero Scene)
- Key light: warm directional from upper-right
- Rim light: cool point light from left
- Emissive accents on reactor core
- Environment: none (dark void background)

---

## 14. Motion Tokens

### 14.1 Duration Constants
```typescript
export const MOTION = {
  FAST: 0.2,       // UI micro-interactions
  UI: 0.35,        // Buttons, hovers, small transitions
  SCENE: 0.8,      // Section transitions, card movements
  CINEMATIC: 1.8,  // Camera, gate, constellation
  EPIC: 3.0,       // Full constellation sequence
} as const;
```

### 14.2 Easing Constants
```typescript
export const EASE = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutCubic: [0.65, 0, 0.35, 1],
  outBack: [0.34, 1.56, 0.64, 1],
  spring: { stiffness: 180, damping: 22 },
  heavySpring: { stiffness: 120, damping: 18 },
} as const;
```

### 14.3 Implementation
- File: `src/lib/motion.ts` (NEW)
- Imported by all animated components for consistency

---

## 15. Adaptive Quality

### 15.1 Quality Tiers
```typescript
type QualityTier = 'HIGH' | 'MEDIUM' | 'LOW' | 'STATIC';
```

### 15.2 Detection
```
HIGH:    dpr >= 1.5 AND hardwareConcurrency >= 8 AND !prefersReducedMotion
MEDIUM:  dpr >= 1.0 AND hardwareConcurrency >= 4
LOW:     mobile OR hardwareConcurrency < 4
STATIC:  prefersReducedMotion
```

### 15.3 Tier Effects
| Feature | HIGH | MEDIUM | LOW | STATIC |
|---|---|---|---|---|
| Constellation nodes | 80 | 50 | 30 | 0 |
| Edge animations | Shader | Shader | CSS | None |
| Gate geometry | Full | Simplified | 2 planes | Fade |
| Project sway | Physics | CSS sine | None | None |
| Book 3D | CSS 3D | CSS 3D | Slide | Slide |
| Hands | SVG animated | SVG static | Text list | Text list |
| DPR cap | 1.75 | 1.5 | 1.0 | 1.0 |
| Hero particles | 180 | 80 | 0 | 0 |

### 15.4 Implementation
- File: `src/lib/quality.ts` (NEW)
- Hook: `useQualityTier()` — returns current tier
- Updates on resize, never on scroll

---

## 16. Fallback Strategy

If WebGL initialization fails:
- Constellation: replaced by simple CSS radial-gradient dark background + fade-in text
- Gate: replaced by opacity crossfade
- Hero: normal DOM layout (already functional)
- All remaining sections: already DOM-based, work without WebGL

Implementation: `EngineeringCoreFallback.tsx` already exists and provides a pattern.

---

## 17. Asset Loading

### 17.1 Priority Loading
```
P0 (blocking): Constellation node data (inline, ~2KB)
P1 (first paint): hero-portrait.png (preload in <head>)
P2 (intersection): Project card images
P3 (deferred): Certificate images, lab note content
```

### 17.2 Preloading
```html
<link rel="preload" as="image" href="/hero/hero-portrait.png" />
```

---

## 18. Files to Create

| File | Purpose |
|---|---|
| `src/lib/motion.ts` | Motion tokens (durations, easings) |
| `src/lib/quality.ts` | Adaptive quality tier system |
| `src/components/intro/ConstellationIntro.tsx` | Intro constellation WebGL scene |
| `src/components/intro/GateTransition.tsx` | Semiconductor gate transition (or integrated into ConstellationIntro) |
| `src/components/editorial/EngineeringPhilosophy.tsx` | Letter-assembly typography |
| `src/components/projects/SuspendedGallery.tsx` | Wire-suspended project cards |
| `src/components/projects/ProjectBook.tsx` | Book opening interaction |
| `src/components/capabilities/SkillsHands.tsx` | Hands reveal composition |
| `src/components/privantrix/PrivantrixSection.tsx` | Privantrix dedicated section |
| `src/components/vision/VisionSection.tsx` | Future research directions |

## 19. Files to Modify

| File | Changes |
|---|---|
| `src/app/page.tsx` | Replace BootSequence with ConstellationIntro, add new sections |
| `src/app/layout.tsx` | Add portrait preload link |
| `src/components/hero/HeroSection.tsx` | Portrait integration, entrance animation |
| `src/components/hero/EngineeringCoreScene.tsx` | Simplify to background role, remove missing font |
| `src/components/projects/ProjectsSection.tsx` | Integrate SuspendedGallery |
| `src/components/editorial/HowIBuildSection.tsx` | Add EngineeringPhilosophy before pipeline |
| `src/components/capabilities/CapabilitiesSection.tsx` | Integrate SkillsHands |
| `src/components/intro/BootSequence.tsx` | Retain as WebGL fallback path |

---

## 20. Dependencies

### 20.1 No New Dependencies Required Initially
The existing stack (Three.js + R3F + Drei + Framer Motion) is sufficient for all planned effects.

### 20.2 Optional (Install Only If Needed)
- `@react-three/postprocessing` — Only if bloom is needed for constellation (evaluate first without)
- `maath` — Only if easing/interpolation utilities from Drei are insufficient
- **NOT installing:** GSAP, Lenis, leva, any additional animation libraries

---

## 21. Performance Budget

| Metric | Target |
|---|---|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 3.0s (after constellation) |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.05 |
| JS Bundle (initial) | < 250KB gzipped |
| Draw calls (constellation) | < 20 |
| Draw calls (hero) | < 30 |
| Frame rate (desktop) | 60fps |
| Frame rate (mobile) | 30fps minimum |

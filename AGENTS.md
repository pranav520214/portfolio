# Project Knowledge & Agent Guidelines (ECC Standard)

## Project Overview
- **Name**: Pranav Mishra Portfolio (CS + AI + Engineering Design)
- **Stack**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`, Framer Motion, Lucide React.
- **Visual Identity**: Vermilion/orange-red blueprint grid + anime/comic technical poster aesthetic with electric yellow highlights.

## Critical Technical Guidelines

### 1. React Three Fiber Prop Handling
- **NEVER pass DOM dataset attributes (`data-*`) to Three.js primitives (`<group>`, `<mesh>`, etc.)**:
  - In R3F, any hyphenated attribute (like `data-cursor="3d"`) is treated by R3F reconciler as nested object traversal: `target['data']['cursor'] = '3d'`. Because Three.js `Object3D` instances do not have a `data` object, this causes `TypeError: Cannot read properties of undefined (reading 'cursor')`.
  - Always place `data-cursor` on the outer HTML/DOM `<div>` wrapping the `<Canvas>`.
  - For 3D meshes, use native Three.js events (`onPointerOver`, `onPointerOut`, `onClick`).

### 2. WebGL Dynamic Loading & SSR
- Always load Three.js Canvas scenes via `next/dynamic` with `{ ssr: false }` to avoid SSR hydration mismatches:
  ```tsx
  const TechConstellation3D = dynamic(
    () => import("@/components/toolbox/TechConstellation3D").then((mod) => mod.TechConstellation3D),
    { ssr: false }
  );
  ```

### 3. Audio & Interaction Discipline
- Procedural sounds are generated via Web Audio API in `src/components/audio/SoundSystem.ts`.
- **Muted by default** with a persistent toggle. Do not use external heavy audio files.

### 4. Build & Verification
- Test build: `npm run build`
- Dev server: `npm run dev`

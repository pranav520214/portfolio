# Claude Code / Antigravity Project Instructions (ECC Format)

## Build & Test Commands
- `npm run dev`: Start Next.js local development server (port 3000)
- `npm run build`: Compile full production build with TypeScript and route validation
- `npm run start`: Launch optimized production server

## Architecture Rules
1. **Three.js / React Three Fiber Props**:
   - Hyphenated props on Three.js tags (e.g. `<group data-cursor="3d">`) trigger nested property setters `target['data']['cursor']`, which errors if `target.data` is undefined.
   - Attach all `data-*` attributes strictly to wrapping DOM `<div>` elements.
2. **Client Components**:
   - Files importing Three.js, Canvas, Framer Motion, or Window APIs must declare `'use client';` at line 1.
   - Dynamic import with `ssr: false` is required when mounting 3D scenes in pages.
3. **Styling & Assets**:
   - Blueprint palette: `blueprint-red` (`#d94431`), `comic-yellow` (`#ffe600`), `blueprint-950` (`#080302`).
   - Certificates and proof images reside under `/public/certificates/`.

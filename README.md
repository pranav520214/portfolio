# Pranav Mishra — Portfolio

A multilingual constellation entrance and illustrated engineering workbench for projects, skills, achievements and notes.

## Development

Use Node.js 24 and npm. Run `npm ci`, then `npm run dev`. Open http://localhost:3000; the portrait introduction is at `/introduction`.

Before publishing, run `npm run verify:content` and `npm run build`. Use `npm start` to preview the production build.

## Repository layout

| Directory | Purpose |
| --- | --- |
| `src/app/` | Next.js routes and styles |
| `src/components/experience/` | Current portrait, skill workbench and animation system |
| `src/components/` | Feature components, shared UI and retained experimental scenes |
| `src/data/` | Portfolio facts, greetings and media mappings |
| `src/lib/` | Markdown parser and shared helpers |
| `content/notes/` | Published engineering notes |
| `public/` | Public artwork, certificates and licensed local fonts |
| `assets/source/` | Original source assets outside the public web directory |
| `scripts/` | Content verification |
| `docs/` | Current architecture, release guidance and visual handoff |
| `docs/archive/` | Historical plans and implementation reports |

## Editing

Portfolio facts live in `src/data/portfolioContent.ts`; greetings in `src/data/constellations.ts`. The portrait is composed in `IntroPortrait.tsx`, motion in `CraftMotion.tsx`, and current styling in `src/app/crafted.css`. Project recordings can be mapped in `src/data/projectMedia.ts`; without recordings, previews remain labelled animated sketches.

Semantic HTML carries the content. GSAP/Lenis enhances motion and a dynamically loaded Three.js scene illustrates the assembly. Reduced motion, static WebGL fallbacks and muted-by-default sound remain available.

## Deployment and secrets

The current portfolio needs no application secrets or environment variables. Contact uses the existing public email. Never commit environment files, tokens, private keys, credentials, Vercel local state or generated builds. Store deployment credentials in the provider's credential store. All `NEXT_PUBLIC_` values and everything under `public/` are public.

See [preserved versions](docs/PORTFOLIO_VERSIONS.md), [visual direction](docs/CRAFTED_V3_DIRECTION.md) and [implementation handoff](docs/CRAFTED_V3_HANDOFF.md). Older designs remain Git tags rather than duplicate production directories.

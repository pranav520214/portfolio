# Portfolio versions

Each design is preserved in Git, including the original uncommitted work found at the start of this task. Versions are not copied into the production bundle.

| Version | Preserved reference | Description |
| --- | --- | --- |
| Original | `portfolio-v1-preserved-2026-09-19` | Original repository and working changes, saved at `cf9e010` |
| Atlas v2 | `portfolio-v2-atlas-2026-09-19` | Four greeting constellations, portal routes, scroll assembly, tower gallery and achievement garden |
| Crafted v3 | `codex/crafted-portfolio-v3` / `portfolio-v3-crafted-2026-09-19` | Centered portrait, illustrated depth composition, interactive skill sheets, GSAP choreography, warm paper/vermilion visual system |

To inspect an old version without changing the current working directory, create a separate Git worktree from its tag. Install dependencies and run the app in that worktree. Do not overwrite the current checkout or copy old build output over a newer version.

The v3 source and preserved tags were pushed to GitHub on September 20. Release `portfolio-v3-release-2026-09-20` includes repository cleanup, security updates and automated verification. Vercel production deployment remains pending a working deployment connection.

# Publishing the portfolio

The production source is the GitHub `main` branch. Historical visual versions remain tagged; never rewrite their history to publish a new design.

## Verification

1. Run `npm ci` on Node.js 24.
2. Run `npm run verify:content`, `npm audit --audit-level=high`, and `npm run build`.
3. Check the portrait, skill selectors and WebGL assembly in the production preview. A successful compile alone does not prove that the React/Three.js renderer is compatible.
4. Scan the complete Git history with Gitleaks using redacted output before pushing. GitHub Actions repeats secret, dependency, content and build checks.
5. Publish only after verifying the exact commit and branch.

## Vercel settings

- Framework: Next.js
- Root directory: repository root
- Install: `npm ci`
- Build: `npm run build`
- Output directory: framework default
- Node.js: 24.x
- Application environment variables: none required
- Production branch: `main`

The Vercel account must have access to `pranav520214/portfolio`. Select the existing portfolio project when available. Do not invent a production URL or report a successful deployment before Vercel reports Ready and the public routes work.

The September 20 connector check returned no projects in the connected team, and the deployment call returned `Tool deploy_to_vercel not found`. This is a deployment-tool blocker, not an application build failure.

## Dependency compatibility

Next.js 15 App Router requires the React 19-compatible Three.js renderer for this site. React 19.2, React Three Fiber 9 and Drei 10 are upgraded together. PostCSS is overridden to the direct patched version so Next.js does not retain its vulnerable nested copy. Keep the lockfile committed and validate future dependency changes in the browser.

## September 20 verification

- Production build: passed, 18 generated pages.
- Content checks and 15-route HTTP smoke: passed.
- Dependency audit: zero reported vulnerabilities.
- Full-history Gitleaks scan: 11 commits, no leaks detected before publishing.
- Browser: React 19-compatible WebGL canvas mounted with no warning/error logs; skill selection verified.
- GitHub: `main`, the v3 branch, and all four portfolio version tags pushed successfully.

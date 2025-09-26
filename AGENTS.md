# Repository Guidelines

## Project Structure & Module Organization
- Root: `index.html`, `404.html`, `voxtide-privacy.html`, `manifest.json`, `robots.txt`, `sitemap.xml`.
- Assets: `assets/css/styles.css`, `assets/js/app.js`, `assets/img/*` (logos, icons, hero, OG cover).
- JS State & i18n live in `assets/js/app.js` (`state`, `i18n`). UI is rendered by DOM updates, no framework.

## Build, Test, and Development Commands
- Serve locally (Python 3): `python -m http.server 8080` then open `http://localhost:8080`.
- Alternative (Node): `npx http-server -p 8080`.
- No build step: deploy the folder to Netlify/Vercel/Pages. Update `sitemap.xml`/`robots.txt` with your domain.

## Coding Style & Naming Conventions
- HTML: semantic HTML5, 2‑space indentation, lowercase hyphenated filenames.
- CSS: use custom properties in `:root`; keep selectors class‑based; prefer small, composable utilities.
- JS: 2 spaces, single quotes, trailing commas; avoid globals beyond `state`/`i18n`; ids are lowercase and ascii (e.g., `astrodia`).
- Assets: place images in `assets/img`, scripts in `assets/js`, styles in `assets/css`.

## Testing Guidelines
- No test framework. Validate manually:
  - Language toggle (ES/EN) and theme switch work and persist (`localStorage.lang`, `localStorage.theme`).
  - Navigation anchors, external links, and email (`mailto:goldenkeystudios0@gmail.com`) work.
  - No console errors; layout responsive; icons and OG image load.
- Optional: run Lighthouse in Chrome and target 90+ for all categories.

## Commit & Pull Request Guidelines
- Commits: follow Conventional Commits (e.g., `feat: add neon theme`, `fix: correct i18n keys`).
- PRs must include: concise description, before/after screenshots for visual changes, linked issue (if any), and notes on SEO files updated (`sitemap.xml`, `robots.txt`).
- Keep diffs focused; avoid unrelated formatting changes.

## Security & Configuration Tips
- Do not commit secrets. Only `localStorage` keys `theme` and `lang` are used.
- Update `manifest.json` icons and `assets/img/og-cover.png` when branding changes.
- Ensure images have `alt` text and links have clear labels for accessibility.


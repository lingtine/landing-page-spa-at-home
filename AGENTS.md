# AGENTS.md

## Cursor Cloud specific instructions

This is **IDMassage Landing Page** — a statically-exported Next.js 14 landing page for a massage service in Ho Chi Minh City. There is no backend, no database, and no external service dependencies.

### Service overview

| Service | Command | Port |
|---------|---------|------|
| Next.js dev server | `npm run dev` | 3000 |

### Standard commands

All standard commands are in `package.json` scripts:
- **Dev:** `npm run dev`
- **Lint:** `npm run lint` (ESLint with `next/core-web-vitals`)
- **Build:** `npm run build` (static export to `out/`)

### Non-obvious notes

- Despite `package.json` containing `"packageManager": "yarn@1.22.22"`, the actual lockfile is `package-lock.json` (npm). Always use **npm**, not yarn.
- The site uses `output: 'export'` (static site generation). There is no server runtime — `npm run build` produces a static `out/` directory.
- Translations are in `messages/*.json` (vi, en, ko). The i18n routing is custom via `[locale]` dynamic segments, not `next-intl` or similar libraries.
- Business configuration (phone, Zalo link, logo paths) is hardcoded in `global-config.ts`, not environment variables.
- Lint produces warnings about `<img>` vs `<Image />` — these are expected since `next/image` optimization is disabled for static export (`images.unoptimized: true`).

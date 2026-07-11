# AGENTS.md

## Cursor Cloud specific instructions

This repository is a single, frontend-only **Vue 3 + Vite** personal portfolio SPA (no backend, no database, no external services). Content is static (see `src/data/`).

### Services

- **Vite dev server** — the only runtime process. Start with `npm run dev` (serves at `http://localhost:5173`). This is the whole product; there are no auxiliary services to start.

### Commands (defined in `package.json`)

- Dev: `npm run dev`
- Build: `npm run build` (outputs `dist/`)
- Preview a build: `npm run preview`
- Lint: `npm run lint` (`eslint . --fix`)
- Format: `npm run format` (`prettier --write src/`)
- Lighthouse CI (optional, CI-only quality gate): `npm run lhci` (requires a prior `npm run build`)

### Non-obvious notes

- Node must satisfy `engines`: `^20.19.0 || >=22.12.0`. The VM's Node 22 works.
- There is **no test runner configured** — the `README.md` mention of `npm run test:unit` (Vitest) is leftover scaffolding; no `test:unit` script or test files exist.
- `vite-plugin-vue-devtools` only loads in development mode (see `vite.config.js`).

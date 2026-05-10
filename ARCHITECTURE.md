# Architecture

## Overview

A tablet-first web game for kids, optimized for iPad and supporting Android tablets. Hosted as a static site on GitHub Pages. The game is structured as a set of modules; the first module is the **Character Designer**.

## Goals & Constraints

- **Audience**: kids (approx. ages 4–10). Reading-light UI, large tap targets, friendly visuals.
- **Primary device**: iPad (Safari). Secondary: Android tablets (Chrome).
- **Hosting**: GitHub Pages (static only — no server, no database, no build secrets).
- **Offline-friendly**: should work after first load with no network (PWA-style caching).
- **No accounts**: no login, no PII collection, no analytics with personal data. COPPA-aware.
- **No third-party ads or trackers.**

## Tech Stack

- **Language**: TypeScript.
- **Framework**: React 18 + Vite. (Rationale: fast dev, simple static build, broad ecosystem, easy to ship to GH Pages.)
- **Styling**: CSS Modules + a small set of design tokens (CSS custom properties). No Tailwind to keep dependencies minimal for now.
- **State**: React state + a lightweight store (Zustand) for cross-module game state (e.g. saved character).
- **Persistence**: `localStorage` (saved character, settings). No cloud sync.
- **Graphics**: SVG for character parts (crisp at all sizes, easy to recolor, small payload). Raster (PNG/WebP) only for backgrounds or textured assets.
- **Audio**: Howler.js for sound effects (optional, mute by default — kids' tablets are often shared).
- **PWA**: Vite PWA plugin for installable icon + offline cache.
- **Testing**: Vitest for unit tests; Playwright for one or two smoke flows on tablet viewports.

## Hosting & Deployment

- Repo: `adamdwilson/claire-banana-chicken`.
- Build output: `dist/` deployed to the `gh-pages` branch via a GitHub Actions workflow on push to `main`.
- Custom domain: not required initially; will live at `https://adamdwilson.github.io/claire-banana-chicken/`.
- Because GH Pages serves from a sub-path, Vite must be configured with `base: '/claire-banana-chicken/'`.
- All asset paths must be relative to `import.meta.env.BASE_URL` — never hard-coded `/`.

## Project Structure

```
/
├── ARCHITECTURE.md
├── requirements/
│   └── character-designer.md
├── public/                    # static assets copied as-is
│   └── icons/
├── src/
│   ├── main.tsx               # app entry
│   ├── App.tsx                # top-level router / module switcher
│   ├── shell/                 # app shell: home screen, nav, settings
│   ├── modules/
│   │   └── character-designer/
│   │       ├── index.tsx
│   │       ├── components/
│   │       ├── assets/        # SVG parts (hair, eyes, clothes…)
│   │       └── state.ts
│   ├── store/                 # cross-module game state (Zustand)
│   ├── ui/                    # shared kid-friendly components (BigButton, Carousel…)
│   ├── styles/                # tokens, resets, global styles
│   └── lib/                   # utilities (storage, audio, device)
├── tests/
├── index.html
├── vite.config.ts
└── package.json
```

## Module Model

Each module under `src/modules/<name>/` is self-contained: its own components, assets, and local state. The shell decides which module is active. Cross-module data (e.g. the saved character used as an avatar in future games) lives in `src/store/`.

Planned modules (subject to change):
1. **Character Designer** — first module. See `requirements/character-designer.md`.
2. Future ideas: dress-up scenes, mini-games, coloring book, sticker book.

## Tablet UX Principles

- **Target sizes**: minimum 64×64 CSS px tap targets; primary action buttons 96×96+.
- **Layout**: design for 1024×768 (iPad portrait/landscape) first; scale fluidly to 1180×820 (iPad Air), 1366×1024 (iPad Pro 13"), and common 10" Android tablets.
- **Orientation**: support both portrait and landscape. Lock nothing.
- **Input**: touch-first. Use Pointer Events so mouse/stylus also work for development. No hover-only affordances.
- **Gestures**: limit to tap, drag, and horizontal swipe in carousels. Avoid pinch/multi-touch in v1.
- **Safe area**: respect `env(safe-area-inset-*)` for iPad with home indicator.
- **Prevent zoom & bounce**: `viewport-fit=cover`, `user-scalable=no` (kids accidentally pinch), `overscroll-behavior: none` on the app root.
- **Sound**: muted by default; toggle in a settings drawer. Sounds short, gentle, no startles.
- **Reading level**: icons + 1–2 word labels. Optional spoken prompts later.
- **Accessibility**: high-contrast palette, respects `prefers-reduced-motion`, full keyboard reachability for adult helpers.

## Performance Budget

- Initial JS payload (gzipped): ≤ 200 KB for the shell + character designer.
- Time to interactive on a 2018 iPad over Wi-Fi: ≤ 2.5 s.
- 60 fps for drag interactions on iPad Air (M1 and later trivially; older A10+ devices are the floor).

## Privacy

- No network calls after asset load.
- `localStorage` only stores game state (character config, settings). No identifiers.
- No third-party scripts.

## Open Questions

- Do we want a parent gate (simple math question) before any future external links or settings? Probably yes once we have any external link.
- Do we want multiple save slots (so siblings can each have a character) in v1, or single save?
- Audio: ship with sound effects on day one, or defer?

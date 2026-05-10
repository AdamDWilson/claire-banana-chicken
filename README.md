# Claire Banana Chicken

A tablet-first kids' game. Working title. First module: a character designer.

See `ARCHITECTURE.md` for the technical overview and `requirements/character-designer.md` for the module spec.

## Develop

```bash
npm install
npm run dev      # opens Vite dev server
npm run build    # typecheck + production build to ./dist
npm run preview  # serve the built ./dist locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `./dist` to GitHub Pages. You'll need to enable Pages in repo settings (Source: GitHub Actions).

Live URL once deployed: `https://adamdwilson.github.io/claire-banana-chicken/`.

The Vite `base` is set to `/claire-banana-chicken/` so all assets resolve under the GH Pages sub-path. If you fork to a differently-named repo, update `vite.config.ts` to match.

## Project layout

```
src/
  main.tsx, App.tsx         entry + simple route switcher
  shell/                    home screen + mascot
  modules/character-designer/
    Designer.tsx            designer screen (tabs, carousels)
    CharacterPreview.tsx    composes layered SVG parts
    PartThumb.tsx           thumbnail in carousels
    TabIcons.tsx            hand-drawn category icons
    parts.tsx               all SVG part renderings
    catalogue.ts            ids, palettes, defaults, random
  store/game.ts             Zustand store, persisted to localStorage
  styles/global.css         tokens + resets
  ui/BigButton.tsx          shared button
```

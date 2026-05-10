# Character Designer — Requirements (Draft)

> Module 1 of the kids' tablet game. This document is a starting point for iteration. Nothing here is final — review, mark up, and change before any code is written.

## 1. Purpose

Let a kid create a character that's *theirs*: pick body, face, hair, outfit, and accessories. The result is saved on the device and becomes the player's avatar in future modules.

## 2. Audience & Tone

- Ages ~4–10. Designed so a 4-year-old can use it without reading.
- Tone: friendly, silly, encouraging. Never punitive. No "wrong" choices.
- Inclusive by default: skin tones, hair textures, body shapes, and clothing styles should not be gendered, ranked, or hidden behind progression.

## 3. Core User Flow

1. **Start screen**: "Make your character!" with a big start button. If a saved character exists, show "Keep playing" and "Start over" options.
2. **Designer screen**: large character preview on one side, category tabs + options on the other.
3. **Save screen**: short celebration ("Looking good!"), name the character (optional, skippable), tap Save.
4. Returns to home with the new character displayed.

Kids should be able to back out of any step and re-enter without losing progress.

## 4. Customization Categories (v1)

Tabs, in this order:

1. **Body** — skin tone (8 options), body shape (3 options: small / medium / tall — neutral, not gendered).
2. **Face** — eye shape (4), eye color (6), eyebrows (3), mouth (4), freckles/blush toggle.
3. **Hair** — style (~10, mix of short/long/curly/coily/braided/bald/headwrap), color (10 including natural + fun colors like pink/blue).
4. **Top** — shirts, dresses, hoodies (~8 options × small color palette).
5. **Bottom** — pants, shorts, skirts (~6 options × small color palette). Hidden if the Top is a full-length dress.
6. **Shoes** — (~5 options × colors).
7. **Accessories** — glasses, hats, backpacks, pets-on-shoulder (~8 options, optional, can be "none").

Each category opens a horizontally swipeable carousel of large thumbnails. Selecting an option updates the preview live.

Counts above are targets for v1 — exact numbers TBD when we draw assets.

## 5. Screen Layout

### Landscape (primary)

```
┌─────────────────────────────────────────────────────────┐
│  [home]                                  [sound] [help] │
│                                                         │
│   ┌─────────────────┐   ┌──────────────────────────┐    │
│   │                 │   │  [Body][Face][Hair][Top]…│    │
│   │                 │   │                          │    │
│   │  CHARACTER      │   │  ◀  ┌───┐┌───┐┌───┐  ▶  │    │
│   │  PREVIEW        │   │     │ A ││ B ││ C │      │    │
│   │                 │   │     └───┘└───┘└───┘      │    │
│   │                 │   │                          │    │
│   │   [🎲 Surprise] │   │   [color row: ● ● ● ● ●] │    │
│   └─────────────────┘   └──────────────────────────┘    │
│                                                         │
│                              [ Save ✓ ]                 │
└─────────────────────────────────────────────────────────┘
```

### Portrait

Stack: preview on top (60% height), tabs + carousel below (40%), Save button pinned to safe-area bottom.

## 6. Interactions

- **Tap a thumbnail** → applies it to the preview with a small bounce animation.
- **Tap a color dot** → recolors the currently selected item (where applicable).
- **Surprise me 🎲** → randomizes everything; the preview animates through the changes one category at a time.
- **Undo** — small ↩︎ button; undoes the last change. Optional in v1, nice to have.
- **Drag** in carousel = scroll horizontally. Edge bounce, but no overscroll on the page.
- **Long-press** on the preview = no-op in v1 (reserved).

## 7. Visual Style

- Flat vector illustration, thick rounded outlines, soft palette. Think "modern picture book."
- Character composed of layered SVG parts so each piece can be swapped/recolored independently. Layer order (back→front): background, body shape, bottom, top, shoes, head/face base, eyebrows, eyes, mouth, freckles, hair, accessories.
- All parts share an anchor system so swaps line up without per-asset tweaking.

## 8. Audio (optional v1)

- Soft "pop" when a new option is applied.
- Gentle chime on Save.
- Muted by default. Toggle in the top bar.

## 9. Persistence

- Character config (a small JSON object: ids + colors + optional name) saved to `localStorage` under a versioned key (e.g. `cbc.character.v1`).
- One save slot in v1. Multiple slots is a future enhancement.
- "Start over" prompts a confirmation ("Are you sure? Your character will be lost.") with kid-readable Yes/No icons.

## 10. Accessibility

- Color is never the only signal — selected state also shows a checkmark and a thicker border.
- Full keyboard navigation works (for an adult helper): Tab between categories, arrow keys through options, Enter to apply.
- Respects `prefers-reduced-motion` (skips the bounce/randomize animation).
- All controls have `aria-label`s; the preview has a live-region summary ("Hair: curly, pink").

## 11. Out of Scope (v1)

- Drawing custom items.
- Sharing/exporting the character image.
- Photo import.
- Multiplayer / cloud sync.
- Voice prompts (planned for later).

## 12. Open Questions for Adam

- **Naming**: should the character get a name in v1, or skip and add later?
- **Asset source**: do we hand-draw the SVG parts, license a kit (e.g. an open-licensed character set), or generate placeholders first and replace later? My suggestion: ship with simple hand-rolled placeholders so we can iterate on UX, then upgrade art.
- **Categories**: anything missing, or anything to cut for v1? (Suggested cut if we need to: Accessories.)
- **Color palette**: how "wild" should fun hair/clothing colors get? Bright & saturated, or muted picture-book?
- **Preview pose**: static front-facing only, or a small idle animation (blink + sway)?
- **Save slots**: one or several?
- **Sound**: ship with audio in v1 or defer?
- **Branding**: any name for the character / mascot of the app yet? (Repo is "claire-banana-chicken" — is that the working title?)

## 13. Acceptance Criteria (draft)

- A child can, on an iPad, go from the home screen to a saved character in ≤ 2 minutes without adult help, using only taps and swipes.
- All categories listed in §4 are functional and persist across reloads.
- The app works fully offline after first load.
- No console errors on iPad Safari or Android Chrome on a fresh install.
- Lighthouse PWA score ≥ 90 on the deployed build.

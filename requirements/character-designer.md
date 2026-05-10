# Character Designer — Requirements (Draft v2)

> Module 1 of the kids' tablet game. Updated after reviewing Claire's wireframe. Still a working draft — keep marking it up.

## 0. Design Source

Claire's hand-drawn wireframe (`requirements/references/claire-wireframe-v1.jpg` — to be added) is the primary design reference for this module. Key things we're taking from it:

- The set of categories: **Skin**, **Hair (colours + styles)**, **Eyes**, **Mouths**, **Cloths**, **Accessories**.
- The **art style for icons and the mascot**: hand-drawn, marker-and-pencil feel, wobbly outlines, kid-energy. We will reproduce this style for the home-screen mascot, category icons, the "Surprise me" button, and the Save celebration. Polished vector art is *not* the goal — we want it to look like a kid made it.
- The home-screen idea: a little character you tap to "make your character."
- Eye and mouth styles drawn as simple shapes (dots, dashes, x's, U's, O's). We'll honor that simplicity rather than drawing photoreal eyes.
- Outfit drawings (plaid, rainbow, stripes) — patterned shirts are explicitly a thing kids want, so the clothing set must include patterns, not just solid colors.

What we are diverging from, with reasons:

- **Layout**: Claire drew all categories visible at once. We're using **tabs** (one category at a time) so each option thumbnail can be big enough for little fingers on an iPad, and so we can fit more options per category. The tab bar will still show all categories as icons, so nothing is hidden.
- **Cloths**: we're splitting into **Top + Bottom** (instead of one whole-outfit pick) so kids get more combinations and creativity.
- **Skin colours**: realistic tones only in v1. Fun fantasy colors (green/blue/purple skin) can come back in a future "creatures" module so this module stays grounded.

## 1. Purpose

Let a kid create a character that's *theirs*: pick body, face, hair, outfit, and accessories. The result is saved on the device and becomes the player's avatar in future modules.

## 2. Audience & Tone

- Ages ~4–10. Designed so a 4-year-old can use it without reading.
- Tone: friendly, silly, encouraging. Never punitive. No "wrong" choices.
- Inclusive by default: skin tones, hair textures, body shapes, and clothing styles should not be gendered, ranked, or hidden behind progression.

## 3. Core User Flow

1. **Home screen**: two side-by-side "spots." Each spot is either empty (shows the hand-drawn mascot with a "Tap me!" arrow, echoing Claire's "If you press that you can make your character" note) or filled (shows that slot's saved character with **Play** / **Edit** / **Start over** actions).
2. **Designer screen** (reached by tapping an empty spot or Edit on a filled one): large character preview on one side, category tabs + options on the other.
3. **Save**: tap the big Save ✓ button. Short celebration animation ("Looking good!").
4. Returns to home with the new character occupying its slot.

Kids should be able to back out of any step and re-enter without losing progress. A back/home button is always visible in the top-left of the designer.

## 4. Customization Categories (v1)

Tabs, in this order. Tab labels and icons are hand-drawn in Claire's style.

1. **Skin** — skin tone (8 realistic options).
2. **Hair** — style (~10, mix of short/long/curly/coily/braided/bald/headwrap) **and** color (10, natural + fun colors like pink/blue/green for hair only). Both choices live inside this tab — style row on top, color row below.
3. **Eyes** — eye shape (~6 options, drawn simply à la Claire's wireframe: dashes, dots, ovals, x's, sleepy lids), plus eye color (6) for non-line styles.
4. **Mouths** — mouth shape (~6: smile, big grin, little 'o', flat line, tongue-out, teeth). No color choice.
5. **Top** — shirts, dresses, hoodies (~8 options). **Must include patterned options**: plaid, rainbow, stripes, polka dot (per Claire's drawings). Color palette applies to solid options.
6. **Bottom** — pants, shorts, skirts (~6 options × small color palette). Hidden if the Top is a full-length dress.
7. **Shoes** — (~5 options × colors).
8. **Accessories** — glasses, hats, backpacks, pets-on-shoulder (~8 options, optional, can be "none").

Each tab opens a horizontally swipeable carousel of large thumbnails. Selecting an option updates the preview live.

Counts above are targets for v1 — exact numbers TBD when we draw assets.

## 5. Screen Layout

### Home screen (landscape) — two slots

```
┌─────────────────────────────────────────────────────────┐
│                                              [settings] │
│                                                         │
│                Make Your Character!                     │
│                                                         │
│        ┌──────────────┐         ┌──────────────┐        │
│        │   ╭─────╮    │         │   ╭─────╮    │        │
│        │   │ :)  │    │         │   │  ?  │    │        │
│        │   ╰──┬──╯    │         │   ╰──┬──╯    │        │
│        │   ╱     ╲    │         │   ╱     ╲    │        │
│        │  [▶ Play]    │         │  [tap me!]   │        │
│        │ [Edit][↺]    │         │              │        │
│        └──────────────┘         └──────────────┘        │
│           slot 1 (filled)          slot 2 (empty)       │
└─────────────────────────────────────────────────────────┘
```

Empty slots show the hand-drawn mascot bobbing gently (paused if `prefers-reduced-motion`). Filled slots show the saved character idling (see §7 — blink + small sway).

### Designer screen (landscape — primary)

```
┌─────────────────────────────────────────────────────────┐
│  [⌂ home]                                [🔊] [?]       │
│                                                         │
│   ┌─────────────────┐   ┌──────────────────────────┐    │
│   │                 │   │ [Skin][Hair][Eyes][Mouth]│    │
│   │                 │   │ [Top ][Bot ][Shoe][Acc ] │    │
│   │  CHARACTER      │   │                          │    │
│   │  PREVIEW        │   │  ◀  ┌───┐┌───┐┌───┐  ▶  │    │
│   │                 │   │     │ A ││ B ││ C │      │    │
│   │                 │   │     └───┘└───┘└───┘      │    │
│   │   [🎲 Surprise] │   │   [color row: ● ● ● ● ●] │    │
│   └─────────────────┘   └──────────────────────────┘    │
│                                                         │
│                              [ Save ✓ ]                 │
└─────────────────────────────────────────────────────────┘
```

Tab icons are hand-drawn glyphs (a face for Skin, a hairstyle squiggle for Hair, an eye doodle, a mouth, a shirt, pants, a shoe, a star for Accessories).

### Designer screen (portrait)

Stack: preview on top (55% height), tab strip + carousel below (45%), Save button pinned to safe-area bottom. Tabs scroll horizontally if they don't all fit.

## 6. Interactions

- **Tap a thumbnail** → applies it to the preview with a small bounce animation.
- **Tap a color dot** → recolors the currently selected item (where applicable: hair color, top color, bottom color, shoe color, eye color).
- **Surprise me 🎲** → randomizes everything; the preview animates through the changes one category at a time.
- **Undo ↩︎** — small button; undoes the last change. Nice-to-have in v1.
- **Drag** in carousel = horizontal scroll. Edge bounce, but no overscroll on the page.
- **Long-press** on the preview = no-op in v1 (reserved).

## 7. Visual Style

- **Icons, mascot, category glyphs, and the Surprise/Save button art**: hand-drawn in Claire's style — marker/pencil texture, slightly wobbly outlines, hand-lettered labels where labels are needed. For v1 we will *create* these in Claire's style based on her wireframe (not scan her originals yet — that's a possible later upgrade).
- **Character preview itself**: a cleaner illustrated style (flat vector, thick rounded outlines, soft palette — "modern picture book") so swaps line up reliably. The contrast between the "kid-drawn UI" and the "storybook character" is intentional — it should feel like the player is drawing the character into being.
- Character composed of layered SVG parts so each piece can be swapped/recolored independently. Layer order (back→front): background, body shape, bottom, top, shoes, head/face base, eyebrows, eyes, mouth, freckles, hair, accessories.
- All parts share an anchor system so swaps line up without per-asset tweaking.
- **Idle animation**: the character preview blinks every few seconds and gently sways (~2° rotation, ~3 s loop). Disabled under `prefers-reduced-motion`. The home-screen mascot uses the same idle.

## 8. Audio

- **No sound effects in v1.**
- Background music is planned for a later version (gentle, loopable, instrumental). The audio toggle in the top bar will appear when music ships, not before.

## 9. Persistence

- Character config (a small JSON object: ids + colors) saved to `localStorage` under a versioned key (e.g. `cbc.characters.v1`).
- **Two save slots** in v1 — enough for two siblings to each have a character. Slots are shown as two side-by-side "spots" on the home screen; an empty spot shows the mascot inviting a tap, a filled spot shows that saved character.
- Each filled slot has small actions: **Play** (large, primary), **Edit** (re-opens the designer pre-filled with that character's config), **Start over** (clears the slot, with a confirmation dialog using kid-readable Yes/No icons).
- No character names in v1; slots are identified visually by the saved character only.

## 10. Accessibility

- Color is never the only signal — selected state also shows a checkmark and a thicker border.
- Full keyboard navigation works (for an adult helper): Tab between categories, arrow keys through options, Enter to apply.
- Respects `prefers-reduced-motion` (skips the bounce/randomize/mascot-bobbing animation).
- All controls have `aria-label`s; the preview has a live-region summary ("Hair: curly, pink").

## 11. Out of Scope (v1)

- Drawing custom items.
- Sharing/exporting the character image.
- Photo import.
- Multiplayer / cloud sync.
- Voice prompts (planned for later).
- Fantasy skin colors (planned for a future "creatures" module).

## 12. Open Questions

Resolved:

- ✅ Top + Bottom split, not whole outfits.
- ✅ Tabs (one category at a time), not all-at-once grid.
- ✅ Realistic skin tones only in v1.
- ✅ Home screen has a hand-drawn mascot in Claire's style.
- ✅ No character names in v1.
- ✅ Icons/mascot: built by us in Claire's style for v1 (her originals possibly scanned in later). Character parts hand-rolled as simple SVGs first.
- ✅ Idle animation on preview and mascot (blink + sway).
- ✅ Two save slots.
- ✅ No sound effects in v1. Background music in a later version.
- ✅ Working title: "claire-banana-chicken" (final name TBD).
- ✅ Four clothing patterns: plaid, rainbow, stripes, polka dot.

Still open:

- **Mascot identity**: is the home-screen mascot a specific recurring character (with its own look/personality, "the guide"), or just a generic kid-drawn stand-in that empty slots show as a prompt?
- **Patterned clothing recoloring**: do patterns have fixed colors (rainbow is always rainbow, plaid is fixed red/black, etc.) or can patterned items be recolored too?
- **Settings affordance**: with no audio in v1, is there anything to put in a settings drawer? Probably drop it from v1 and add when music ships.
- **v1 asset counts**: full target counts in §4 are ambitious for a first release. Ship the full set, or a smaller "starter" set (e.g. 4 of each category) and grow it after first feedback from Claire playing it?
- **Edit vs Surprise interplay**: when editing an already-saved character, should the Surprise 🎲 button be allowed (it overwrites their work) or hidden?
- **Mid-edit exit**: if a kid taps Home before saving, do we silently lose changes, auto-save a draft, or prompt?

## 13. Acceptance Criteria (draft)

- A child can, on an iPad, go from the home screen to a saved character in ≤ 2 minutes without adult help, using only taps and swipes.
- All categories listed in §4 are functional and persist across reloads.
- The app works fully offline after first load.
- No console errors on iPad Safari or Android Chrome on a fresh install.
- Lighthouse PWA score ≥ 90 on the deployed build.
- Home-screen mascot and tab icons are visibly in a hand-drawn style (Claire's aesthetic), distinct from the cleaner character preview.

# Issues found while testing the character designer

Tested via the running dev server (`/Users/adam/Projects/claire-banana-chicken`, branch `claude/kids-game-character-creation-AG5lm`, commit `c83ecca`). Each issue is reproducible in Chrome at the default viewport.

**Resolution status:** issues 1–7 and 9 were fixed in the follow-up commit. Issues 8 ("cap doesn't fully hide curly hair") and 10 ("sandals look like booties") remain open as low-priority polish nits.

## Visual rendering

### 1. Long hair covers the eyes (and most of the face)

**Where:** `src/modules/character-designer/parts.tsx:92-101` (`ha-long`)

The path for `ha-long` draws a single closed shape whose "inner U" peaks at `y=70` and dips back to `y=130`. The eyes live at `y=85`, so the bangs portion of the U sits directly on top of them. The eyes/mouth are drawn *after* the hair, but the hair color still fills the eye area and the eye dots disappear into it, especially on light skin where the bangs read as a solid forehead-curtain.

Repro: Spot 1 → Hair → Long. Visible on every skin tone.

### 2. Bare legs (shorts / skirt) render as 1-px stick lines, not skin tubes

**Where:** `src/modules/character-designer/parts.tsx:21-35` (`BodyBase`)

The legs in `BodyBase` are two open paths (`M 85 215 Q 82 260 84 295` and the mirror). They have `fill={skin}` but no width, so when the bottom is `Pants` the path is hidden, but when `Shorts` or `Skirt` is chosen, the only thing visible below the hem is the 4-px ink stroke — the legs look like a stick figure's legs even though the rest of the body is a chunky tube. Same fix pattern as the arms.

Repro: Spot 1 → Bottom → Shorts (or Skirt). Visible on home tile too once saved.

### 3. Bow accessory is off-center to the left of the head

**Where:** `src/modules/character-designer/parts.tsx:484-498` (`ac-bow`)

The bow paths are drawn around `x=80` (`M 70 40 ... M 90 40 ... circle cx={80}`), but the head is centered at `x=100`. The bow lands on the upper-left of the head instead of on top. Should be centered at `x=100` (i.e., shift the whole group +20 on x).

Repro: Spot 1 → Extras → Bow.

### 4. "Tap me!" callout is clipped on the home mascot

**Where:** `src/shell/Mascot.tsx:46-48`

The SVG `viewBox` is `0 0 200 280`, but the `<text>` starts at `x=156` with `fontSize=20`, so "tap me!" extends past `x=200` and is clipped to "tap m". Either extend the viewBox to ~260 wide, move the text inside the canvas, or set `overflow="visible"` on the svg.

Repro: visible on any empty slot from Home.

### 5. Dot / Dash / Sleepy eyes ignore the eye-color picker

**Where:** `src/modules/character-designer/parts.tsx:165-200` (`Eyes`), `Designer.tsx:215-233`

The catalogue marks Dots, Dashes and Sleepy as `usesColor: false`, and the `Eyes` component hardcodes them to `INK`. But the Designer always renders the `ColorRow` for eye color regardless of which style is selected, so kids can pick "Blue" and see no change. Either hide the color picker when `usesColor === false`, or honor the color in those styles.

Repro: Spot 1 → Eyes → Dots, then click any eye color swatch.

### 6. Dark-skin tones lose facial features

**Where:** `src/modules/character-designer/parts.tsx` (`Eyes`, `Mouth`)

`Dots`, `Smile`, `Flat` and friends are all drawn in the global `INK` color `#3a2a1a`, which is the same hue as the darkest skin tone (`sk6` = `#4a2d18`). On `sk5`/`sk6`, the eyes and mouth nearly vanish. Consider either using a contrasting outline for facial features, or adding a subtle highlight ring around the eyes/mouth so they stay readable on dark skin.

Repro: Spot 1 → Skin → Very dark.

### 7. Carousel overflow is easy to miss

**Where:** `src/modules/character-designer/Designer.css` (the `.cbc-carousel` list)

The hair tab has 6 styles; at typical viewport widths only 5 fit visibly, and the 6th (`Braids`) is half-clipped at the right edge with no obvious "more →" affordance besides a thin native scrollbar. For a kid-targeted UI, the hidden option is a real risk — consider an arrow button or page indicator.

Repro: Spot 1 → Hair, observe the right edge.

## Minor nits / polish

### 8. Cap doesn't fully hide curly hair underneath

**Where:** `parts.tsx` (`Hair` for `ha-curly` + `Accessory` for `ac-cap`)

Curly hair uses individual `<circle>` bumps at `cx=68, 86, 108, 130, 140, 60`. The cap `path` covers the scalp but the outermost curl bumps poke out past the cap brim on both sides, producing "earmuff" tufts. Acceptable as a stylistic choice but worth a look.

### 9. "Oh!" mouth ellipse sits slightly lower than the others

**Where:** `parts.tsx:235-245`

The other mouths sit on `y≈108-112`, `mo-oh` is centered at `cy=112` with `ry=7`, so the bottom of the ellipse reaches `y=119` — visibly lower on the face than Smile/Grin/Flat. Could shift up by ~4 px.

### 10. Sandals look like socks

**Where:** `parts.tsx:431-446` (`sh-sandals`)

The straps (`<line>` from x=84,296 to x=88,290) are very short and the sole is the same shape as a closed shoe, so visually it reads as a short bootie rather than a sandal. Low priority.

## Non-issues (verified working)

- Save flow, "Looking good!" toast, and return-to-home transition: ✅
- Persistence across page reload (localStorage `cbc.characters.v1`): ✅
- Spot 1 / Spot 2 state isolation: ✅
- "Start over" modal with No-keep / Yes-start-over both behaving correctly: ✅
- Surprise button randomizes all 13 character fields per click: ✅
- Recolorable vs non-recolorable tops: color picker correctly hides for Stripes/Plaid/Rainbow/Polka dot: ✅

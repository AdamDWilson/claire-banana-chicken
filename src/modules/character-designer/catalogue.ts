// Catalogue of all character parts. v1 is intentionally small: drawn from
// Claire's wireframe with a few additions for coverage.

export type CategoryKey =
  | 'skinId'
  | 'hairStyleId'
  | 'hairColorId'
  | 'eyeStyleId'
  | 'eyeColorId'
  | 'mouthId'
  | 'topId'
  | 'topColorId'
  | 'bottomId'
  | 'bottomColorId'
  | 'shoesId'
  | 'shoesColorId'
  | 'accessoryId';

export type Character = {
  skinId: string;
  hairStyleId: string;
  hairColorId: string;
  eyeStyleId: string;
  eyeColorId: string;
  mouthId: string;
  topId: string;
  topColorId: string;
  bottomId: string;
  bottomColorId: string;
  shoesId: string;
  shoesColorId: string;
  accessoryId: string;
};

// --- Palettes ---------------------------------------------------------------

export const SKIN_TONES = [
  { id: 'sk1', label: 'Very light', color: '#fadfbf' },
  { id: 'sk2', label: 'Light', color: '#f1c293' },
  { id: 'sk3', label: 'Medium light', color: '#d39e6f' },
  { id: 'sk4', label: 'Medium', color: '#b07746' },
  { id: 'sk5', label: 'Dark', color: '#7e4f2a' },
  { id: 'sk6', label: 'Very dark', color: '#4a2d18' },
];

export const HAIR_COLORS = [
  { id: 'h-black', label: 'Black', color: '#241a14' },
  { id: 'h-brown', label: 'Brown', color: '#6b3a1c' },
  { id: 'h-blonde', label: 'Blonde', color: '#e8c46b' },
  { id: 'h-red', label: 'Red', color: '#c0492a' },
  { id: 'h-silver', label: 'Silver', color: '#c8c4bd' },
  { id: 'h-pink', label: 'Pink', color: '#ff8fbf' },
  { id: 'h-blue', label: 'Blue', color: '#5aa9ff' },
  { id: 'h-green', label: 'Green', color: '#79c08a' },
];

export const EYE_COLORS = [
  { id: 'e-brown', label: 'Brown', color: '#5a3a22' },
  { id: 'e-blue', label: 'Blue', color: '#3f86c4' },
  { id: 'e-green', label: 'Green', color: '#5a9a5a' },
  { id: 'e-hazel', label: 'Hazel', color: '#a07a3a' },
];

// Simple palette for recolorable solid clothing items.
export const CLOTH_COLORS = [
  { id: 'c-red', label: 'Red', color: '#e0533a' },
  { id: 'c-orange', label: 'Orange', color: '#f29240' },
  { id: 'c-yellow', label: 'Yellow', color: '#f5cf52' },
  { id: 'c-green', label: 'Green', color: '#6dbf83' },
  { id: 'c-blue', label: 'Blue', color: '#5aa9ff' },
  { id: 'c-purple', label: 'Purple', color: '#a87bd1' },
  { id: 'c-pink', label: 'Pink', color: '#ff8fbf' },
  { id: 'c-black', label: 'Black', color: '#3a2a1a' },
];

// --- Style lists ------------------------------------------------------------

export const HAIR_STYLES = [
  { id: 'ha-bald', label: 'Bald' },
  { id: 'ha-short', label: 'Short' },
  { id: 'ha-long', label: 'Long' },
  { id: 'ha-curly', label: 'Curly' },
  { id: 'ha-bun', label: 'Bun' },
  { id: 'ha-braids', label: 'Braids' },
];

export const EYE_STYLES = [
  { id: 'ey-dots', label: 'Dots', usesColor: false },
  { id: 'ey-round', label: 'Round', usesColor: true },
  { id: 'ey-dashes', label: 'Dashes', usesColor: false },
  { id: 'ey-sleepy', label: 'Sleepy', usesColor: false },
];

export const MOUTH_STYLES = [
  { id: 'mo-smile', label: 'Smile' },
  { id: 'mo-grin', label: 'Big grin' },
  { id: 'mo-oh', label: 'Oh!' },
  { id: 'mo-flat', label: 'Flat' },
];

export const TOPS = [
  { id: 'to-tee', label: 'T-shirt', recolorable: true },
  { id: 'to-stripes', label: 'Stripes', recolorable: false },
  { id: 'to-plaid', label: 'Plaid', recolorable: false },
  { id: 'to-rainbow', label: 'Rainbow', recolorable: false },
  { id: 'to-dots', label: 'Polka dot', recolorable: false },
];

export const BOTTOMS = [
  { id: 'bo-pants', label: 'Pants', recolorable: true },
  { id: 'bo-shorts', label: 'Shorts', recolorable: true },
  { id: 'bo-skirt', label: 'Skirt', recolorable: true },
];

export const SHOES = [
  { id: 'sh-sneakers', label: 'Sneakers', recolorable: true },
  { id: 'sh-boots', label: 'Boots', recolorable: true },
  { id: 'sh-sandals', label: 'Sandals', recolorable: true },
];

export const ACCESSORIES = [
  { id: 'ac-none', label: 'None' },
  { id: 'ac-glasses', label: 'Glasses' },
  { id: 'ac-cap', label: 'Cap' },
  { id: 'ac-bow', label: 'Bow' },
];

// --- Defaults & helpers -----------------------------------------------------

export function defaultCharacter(): Character {
  return {
    skinId: SKIN_TONES[2].id,
    hairStyleId: HAIR_STYLES[1].id,
    hairColorId: HAIR_COLORS[1].id,
    eyeStyleId: EYE_STYLES[0].id,
    eyeColorId: EYE_COLORS[0].id,
    mouthId: MOUTH_STYLES[0].id,
    topId: TOPS[0].id,
    topColorId: CLOTH_COLORS[4].id,
    bottomId: BOTTOMS[0].id,
    bottomColorId: CLOTH_COLORS[7].id,
    shoesId: SHOES[0].id,
    shoesColorId: CLOTH_COLORS[0].id,
    accessoryId: ACCESSORIES[0].id,
  };
}

export function randomCharacter(): Character {
  const pick = <T,>(arr: readonly T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];
  return {
    skinId: pick(SKIN_TONES).id,
    hairStyleId: pick(HAIR_STYLES).id,
    hairColorId: pick(HAIR_COLORS).id,
    eyeStyleId: pick(EYE_STYLES).id,
    eyeColorId: pick(EYE_COLORS).id,
    mouthId: pick(MOUTH_STYLES).id,
    topId: pick(TOPS).id,
    topColorId: pick(CLOTH_COLORS).id,
    bottomId: pick(BOTTOMS).id,
    bottomColorId: pick(CLOTH_COLORS).id,
    shoesId: pick(SHOES).id,
    shoesColorId: pick(CLOTH_COLORS).id,
    accessoryId: pick(ACCESSORIES).id,
  };
}

export const colorFor = (
  list: readonly { id: string; color: string }[],
  id: string
): string => list.find((x) => x.id === id)?.color ?? list[0].color;

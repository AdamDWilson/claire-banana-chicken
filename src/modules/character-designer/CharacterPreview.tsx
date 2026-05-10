import { useEffect, useState } from 'react';
import {
  BodyBase,
  Hair,
  Eyes,
  Mouth,
  Top,
  Bottom,
  Shoes,
  Accessory,
  TorsoClipDef,
} from './parts';
import {
  SKIN_TONES,
  HAIR_COLORS,
  EYE_COLORS,
  CLOTH_COLORS,
  colorFor,
  BOTTOMS,
  type Character,
} from './catalogue';

type Props = {
  character: Character;
  size?: number;
  idle?: boolean;
};

export function CharacterPreview({ character, size = 280, idle = true }: Props) {
  const skin = colorFor(SKIN_TONES, character.skinId);
  const hair = colorFor(HAIR_COLORS, character.hairColorId);
  const eye = colorFor(EYE_COLORS, character.eyeColorId);
  const topColor = colorFor(CLOTH_COLORS, character.topColorId);
  const bottomColor = colorFor(CLOTH_COLORS, character.bottomColorId);
  const shoesColor = colorFor(CLOTH_COLORS, character.shoesColorId);

  const bottomVisible = BOTTOMS.some((b) => b.id === character.bottomId);

  // Blink every few seconds.
  const [blinking, setBlinking] = useState(false);
  useEffect(() => {
    if (!idle) return;
    let timer: number;
    const schedule = () => {
      const delay = 2400 + Math.random() * 2400;
      timer = window.setTimeout(() => {
        setBlinking(true);
        window.setTimeout(() => setBlinking(false), 130);
        schedule();
      }, delay);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [idle]);

  return (
    <svg
      viewBox="0 0 200 320"
      width={size}
      height={size * 1.15}
      role="img"
      aria-label="Your character"
      style={{
        animation: idle ? 'cbc-sway 5s ease-in-out infinite' : undefined,
        transformOrigin: 'center bottom',
      }}
    >
      <TorsoClipDef />
      <BodyBase skin={skin} />
      {bottomVisible && (
        <Bottom id={character.bottomId} color={bottomColor} />
      )}
      <Top id={character.topId} color={topColor} />
      <Shoes id={character.shoesId} color={shoesColor} />
      <Hair style={character.hairStyleId} color={hair} />
      <g
        style={{
          transformOrigin: '100px 85px',
          transform: blinking ? 'scaleY(0.05)' : undefined,
          transition: 'transform 60ms ease',
        }}
      >
        <Eyes style={character.eyeStyleId} color={eye} />
      </g>
      <Mouth style={character.mouthId} />
      <Accessory id={character.accessoryId} />
    </svg>
  );
}

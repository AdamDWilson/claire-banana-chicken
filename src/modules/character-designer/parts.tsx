// All character part renderings. Everything is drawn on a 200×320 canvas
// so the parts share anchor points. Stroke-based hand-drawn look.

import type { JSX } from 'react';

const INK = '#3a2a1a';
const STROKE = 4;

const linecaps = {
  stroke: INK,
  strokeWidth: STROKE,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

// --- Body (skin) ------------------------------------------------------------

export function BodyBase({ skin }: { skin: string }) {
  return (
    <g>
      {/* Legs (so bottoms cover them) */}
      <path
        d="M 85 215 Q 82 260 84 295"
        fill={skin}
        stroke={INK}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <path
        d="M 115 215 Q 118 260 116 295"
        fill={skin}
        stroke={INK}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      {/* Torso silhouette */}
      <path
        d="M 70 135 Q 68 175 72 215 Q 100 222 128 215 Q 132 175 130 135 Q 100 128 70 135 Z"
        fill={skin}
        {...linecaps}
      />
      {/* Arms */}
      <path
        d="M 70 138 Q 55 175 58 210 Q 60 215 65 213"
        fill={skin}
        {...linecaps}
      />
      <path
        d="M 130 138 Q 145 175 142 210 Q 140 215 135 213"
        fill={skin}
        {...linecaps}
      />
      {/* Neck */}
      <path
        d="M 88 130 L 88 138 Q 100 142 112 138 L 112 130 Z"
        fill={skin}
        {...linecaps}
      />
      {/* Head */}
      <ellipse cx={100} cy={85} rx={42} ry={46} fill={skin} {...linecaps} />
      {/* Ears */}
      <path
        d="M 58 85 Q 50 88 54 100 Q 60 102 60 92"
        fill={skin}
        {...linecaps}
      />
      <path
        d="M 142 85 Q 150 88 146 100 Q 140 102 140 92"
        fill={skin}
        {...linecaps}
      />
    </g>
  );
}

// --- Hair -------------------------------------------------------------------

export function Hair({ style, color }: { style: string; color: string }) {
  switch (style) {
    case 'ha-bald':
      return null;
    case 'ha-short':
      return (
        <g>
          <path
            d="M 58 78 Q 60 38 100 36 Q 140 38 142 78 Q 135 60 100 56 Q 70 60 58 78 Z"
            fill={color}
            {...linecaps}
          />
        </g>
      );
    case 'ha-long':
      return (
        <g>
          <path
            d="M 56 80 Q 56 35 100 33 Q 144 35 144 80 Q 148 160 138 200 Q 130 175 130 130 Q 120 70 100 70 Q 80 70 70 130 Q 70 175 62 200 Q 52 160 56 80 Z"
            fill={color}
            {...linecaps}
          />
        </g>
      );
    case 'ha-curly':
      return (
        <g fill={color} stroke={INK} strokeWidth={STROKE} strokeLinejoin="round">
          <circle cx={68} cy={58} r={14} />
          <circle cx={86} cy={46} r={15} />
          <circle cx={108} cy={44} r={16} />
          <circle cx={130} cy={50} r={14} />
          <circle cx={140} cy={70} r={13} />
          <circle cx={60} cy={78} r={12} />
        </g>
      );
    case 'ha-bun':
      return (
        <g>
          <path
            d="M 58 80 Q 60 42 100 40 Q 140 42 142 80 Q 130 62 100 60 Q 70 62 58 80 Z"
            fill={color}
            {...linecaps}
          />
          <circle
            cx={100}
            cy={26}
            r={16}
            fill={color}
            {...linecaps}
          />
        </g>
      );
    case 'ha-braids':
      return (
        <g>
          <path
            d="M 58 80 Q 60 38 100 36 Q 140 38 142 80 Q 130 58 100 54 Q 70 58 58 80 Z"
            fill={color}
            {...linecaps}
          />
          {/* Braid left */}
          <path
            d="M 56 96 Q 48 130 50 170 Q 52 175 56 174 Q 60 130 60 96"
            fill={color}
            {...linecaps}
          />
          <path d="M 50 110 Q 54 115 58 110" stroke={INK} strokeWidth={2} fill="none" />
          <path d="M 50 130 Q 54 135 58 130" stroke={INK} strokeWidth={2} fill="none" />
          <path d="M 50 150 Q 54 155 58 150" stroke={INK} strokeWidth={2} fill="none" />
          {/* Braid right */}
          <path
            d="M 144 96 Q 152 130 150 170 Q 148 175 144 174 Q 140 130 140 96"
            fill={color}
            {...linecaps}
          />
          <path d="M 142 110 Q 146 115 150 110" stroke={INK} strokeWidth={2} fill="none" />
          <path d="M 142 130 Q 146 135 150 130" stroke={INK} strokeWidth={2} fill="none" />
          <path d="M 142 150 Q 146 155 150 150" stroke={INK} strokeWidth={2} fill="none" />
        </g>
      );
    default:
      return null;
  }
}

// --- Eyes -------------------------------------------------------------------

export function Eyes({ style, color }: { style: string; color: string }) {
  switch (style) {
    case 'ey-dots':
      return (
        <g fill={INK}>
          <circle cx={84} cy={85} r={4} />
          <circle cx={116} cy={85} r={4} />
        </g>
      );
    case 'ey-round':
      return (
        <g>
          <circle cx={84} cy={85} r={6.5} fill="#fff" stroke={INK} strokeWidth={2.5} />
          <circle cx={84} cy={85} r={3.5} fill={color} />
          <circle cx={116} cy={85} r={6.5} fill="#fff" stroke={INK} strokeWidth={2.5} />
          <circle cx={116} cy={85} r={3.5} fill={color} />
        </g>
      );
    case 'ey-dashes':
      return (
        <g stroke={INK} strokeWidth={3.5} strokeLinecap="round">
          <line x1={78} y1={85} x2={90} y2={85} />
          <line x1={110} y1={85} x2={122} y2={85} />
        </g>
      );
    case 'ey-sleepy':
      return (
        <g fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round">
          <path d="M 78 88 Q 84 82 90 88" />
          <path d="M 110 88 Q 116 82 122 88" />
        </g>
      );
    default:
      return null;
  }
}

// --- Mouths -----------------------------------------------------------------

export function Mouth({ style }: { style: string }) {
  switch (style) {
    case 'mo-smile':
      return (
        <path
          d="M 88 108 Q 100 118 112 108"
          fill="none"
          stroke={INK}
          strokeWidth={3.5}
          strokeLinecap="round"
        />
      );
    case 'mo-grin':
      return (
        <g>
          <path
            d="M 84 105 Q 100 122 116 105 Z"
            fill="#c44a4a"
            stroke={INK}
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <path
            d="M 86 107 L 116 107"
            stroke="#fff"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
      );
    case 'mo-oh':
      return (
        <ellipse
          cx={100}
          cy={112}
          rx={6}
          ry={7}
          fill="#9a3a3a"
          stroke={INK}
          strokeWidth={3}
        />
      );
    case 'mo-flat':
      return (
        <line
          x1={88}
          y1={112}
          x2={112}
          y2={112}
          stroke={INK}
          strokeWidth={3.5}
          strokeLinecap="round"
        />
      );
    default:
      return null;
  }
}

// --- Tops -------------------------------------------------------------------

const torsoPath =
  'M 56 140 Q 50 175 54 220 Q 100 230 146 220 Q 150 175 144 140 Q 100 148 56 140 Z';

const sleeveLeft =
  'M 56 140 Q 42 175 48 210 Q 56 215 64 212 Q 60 175 62 142';
const sleeveRight =
  'M 144 140 Q 158 175 152 210 Q 144 215 136 212 Q 140 175 138 142';

export function Top({ id, color }: { id: string; color: string }) {
  switch (id) {
    case 'to-tee':
      return (
        <g>
          <path d={sleeveLeft} fill={color} {...linecaps} />
          <path d={sleeveRight} fill={color} {...linecaps} />
          <path d={torsoPath} fill={color} {...linecaps} />
        </g>
      );
    case 'to-stripes':
      return (
        <g>
          <path d={sleeveLeft} fill="#e0533a" {...linecaps} />
          <path d={sleeveRight} fill="#e0533a" {...linecaps} />
          <path d={torsoPath} fill="#ffffff" {...linecaps} />
          <g clipPath="url(#cbc-torso-clip)">
            <rect x={40} y={148} width={120} height={8} fill="#e0533a" />
            <rect x={40} y={168} width={120} height={8} fill="#e0533a" />
            <rect x={40} y={188} width={120} height={8} fill="#e0533a" />
            <rect x={40} y={208} width={120} height={8} fill="#e0533a" />
          </g>
        </g>
      );
    case 'to-plaid':
      return (
        <g>
          <path d={sleeveLeft} fill="#a8302a" {...linecaps} />
          <path d={sleeveRight} fill="#a8302a" {...linecaps} />
          <path d={torsoPath} fill="#c44a4a" {...linecaps} />
          <g clipPath="url(#cbc-torso-clip)">
            <rect x={40} y={150} width={120} height={4} fill="#3a2a1a" />
            <rect x={40} y={175} width={120} height={4} fill="#3a2a1a" />
            <rect x={40} y={200} width={120} height={4} fill="#3a2a1a" />
            <rect x={70} y={140} width={4} height={90} fill="#3a2a1a" />
            <rect x={100} y={140} width={4} height={90} fill="#3a2a1a" />
            <rect x={130} y={140} width={4} height={90} fill="#3a2a1a" />
          </g>
        </g>
      );
    case 'to-rainbow':
      return (
        <g>
          <path d={sleeveLeft} fill="#e0533a" {...linecaps} />
          <path d={sleeveRight} fill="#a87bd1" {...linecaps} />
          <path d={torsoPath} fill="#fff" {...linecaps} />
          <g clipPath="url(#cbc-torso-clip)">
            <rect x={40} y={140} width={120} height={14} fill="#e0533a" />
            <rect x={40} y={154} width={120} height={14} fill="#f29240" />
            <rect x={40} y={168} width={120} height={14} fill="#f5cf52" />
            <rect x={40} y={182} width={120} height={14} fill="#6dbf83" />
            <rect x={40} y={196} width={120} height={14} fill="#5aa9ff" />
            <rect x={40} y={210} width={120} height={14} fill="#a87bd1" />
          </g>
        </g>
      );
    case 'to-dots':
      return (
        <g>
          <path d={sleeveLeft} fill="#ff8fbf" {...linecaps} />
          <path d={sleeveRight} fill="#ff8fbf" {...linecaps} />
          <path d={torsoPath} fill="#ff8fbf" {...linecaps} />
          <g clipPath="url(#cbc-torso-clip)" fill="#fff">
            <circle cx={70} cy={155} r={4} />
            <circle cx={100} cy={150} r={4} />
            <circle cx={130} cy={158} r={4} />
            <circle cx={85} cy={175} r={4} />
            <circle cx={115} cy={180} r={4} />
            <circle cx={70} cy={195} r={4} />
            <circle cx={100} cy={200} r={4} />
            <circle cx={130} cy={195} r={4} />
            <circle cx={85} cy={215} r={4} />
            <circle cx={115} cy={215} r={4} />
          </g>
        </g>
      );
    default:
      return null;
  }
}

// --- Bottoms ----------------------------------------------------------------

export function Bottom({ id, color }: { id: string; color: string }) {
  switch (id) {
    case 'bo-pants':
      return (
        <g>
          <path
            d="M 72 218 Q 70 260 78 295 Q 86 297 92 295 Q 96 260 96 220 Z"
            fill={color}
            {...linecaps}
          />
          <path
            d="M 128 218 Q 130 260 122 295 Q 114 297 108 295 Q 104 260 104 220 Z"
            fill={color}
            {...linecaps}
          />
        </g>
      );
    case 'bo-shorts':
      return (
        <g>
          <path
            d="M 70 218 Q 70 245 80 258 Q 90 260 96 256 Q 100 245 100 218 Z"
            fill={color}
            {...linecaps}
          />
          <path
            d="M 130 218 Q 130 245 120 258 Q 110 260 104 256 Q 100 245 100 218 Z"
            fill={color}
            {...linecaps}
          />
        </g>
      );
    case 'bo-skirt':
      return (
        <g>
          <path
            d="M 64 218 Q 56 250 60 268 Q 100 274 140 268 Q 144 250 136 218 Z"
            fill={color}
            {...linecaps}
          />
        </g>
      );
    default:
      return null;
  }
}

// --- Shoes ------------------------------------------------------------------

export function Shoes({ id, color }: { id: string; color: string }) {
  switch (id) {
    case 'sh-sneakers':
      return (
        <g>
          <path
            d="M 74 293 Q 70 303 80 305 Q 95 307 96 298 L 96 290 Z"
            fill={color}
            {...linecaps}
          />
          <path
            d="M 126 293 Q 130 303 120 305 Q 105 307 104 298 L 104 290 Z"
            fill={color}
            {...linecaps}
          />
          <path d="M 78 300 L 90 300" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" fill="none" />
          <path d="M 110 300 L 122 300" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" fill="none" />
        </g>
      );
    case 'sh-boots':
      return (
        <g>
          <path
            d="M 74 280 Q 70 305 82 307 Q 96 308 96 298 L 96 280 Z"
            fill={color}
            {...linecaps}
          />
          <path
            d="M 126 280 Q 130 305 118 307 Q 104 308 104 298 L 104 280 Z"
            fill={color}
            {...linecaps}
          />
        </g>
      );
    case 'sh-sandals':
      return (
        <g>
          <path
            d="M 74 298 Q 72 306 82 306 Q 96 306 96 300 Z"
            fill={color}
            {...linecaps}
          />
          <path
            d="M 126 298 Q 128 306 118 306 Q 104 306 104 300 Z"
            fill={color}
            {...linecaps}
          />
          <line x1={84} y1={296} x2={88} y2={290} stroke={color} strokeWidth={3} strokeLinecap="round" />
          <line x1={116} y1={296} x2={112} y2={290} stroke={color} strokeWidth={3} strokeLinecap="round" />
        </g>
      );
    default:
      return null;
  }
}

// --- Accessories ------------------------------------------------------------

export function Accessory({ id }: { id: string }): JSX.Element | null {
  switch (id) {
    case 'ac-none':
      return null;
    case 'ac-glasses':
      return (
        <g fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round">
          <circle cx={84} cy={86} r={11} fill="rgba(255,255,255,0.4)" />
          <circle cx={116} cy={86} r={11} fill="rgba(255,255,255,0.4)" />
          <line x1={95} y1={86} x2={105} y2={86} />
        </g>
      );
    case 'ac-cap':
      return (
        <g>
          <path
            d="M 56 60 Q 60 30 100 28 Q 140 30 144 60 Q 100 50 56 60 Z"
            fill="#e0533a"
            {...linecaps}
          />
          <path
            d="M 142 58 Q 168 58 168 70 Q 150 68 138 64 Z"
            fill="#e0533a"
            {...linecaps}
          />
          <circle cx={100} cy={42} r={3.5} fill="#fff" />
        </g>
      );
    case 'ac-bow':
      return (
        <g>
          <path
            d="M 70 40 Q 60 30 60 48 Q 70 58 80 50 Z"
            fill="#ff8fbf"
            {...linecaps}
          />
          <path
            d="M 90 40 Q 100 30 100 48 Q 90 58 80 50 Z"
            fill="#ff8fbf"
            {...linecaps}
          />
          <circle cx={80} cy={49} r={4} fill="#ff8fbf" {...linecaps} />
        </g>
      );
    default:
      return null;
  }
}

// Shared clip path so patterned tops stay inside the torso silhouette.
export function TorsoClipDef() {
  return (
    <defs>
      <clipPath id="cbc-torso-clip">
        <path d={torsoPath} />
      </clipPath>
    </defs>
  );
}

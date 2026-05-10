// Hand-drawn category icons. Marker-feel: round caps, slightly wobbly paths.

const INK = '#3a2a1a';
const stroke = {
  stroke: INK,
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

type IconProps = { size?: number };

export function SkinIcon({ size = 36 }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <ellipse cx={20} cy={20} rx={13} ry={14} {...stroke} fill="#f1c293" />
      <circle cx={15} cy={20} r={1.5} fill={INK} />
      <circle cx={25} cy={20} r={1.5} fill={INK} />
      <path d="M 15 26 Q 20 30 25 26" {...stroke} fill="none" />
    </svg>
  );
}

export function HairIcon({ size = 36 }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <path d="M 8 22 Q 8 8 20 7 Q 32 8 32 22 Q 28 16 20 14 Q 12 16 8 22 Z" {...stroke} fill="#6b3a1c" />
      <path d="M 12 22 Q 12 32 14 36" {...stroke} fill="none" />
      <path d="M 28 22 Q 28 32 26 36" {...stroke} fill="none" />
    </svg>
  );
}

export function EyesIcon({ size = 36 }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <circle cx={14} cy={20} r={4} {...stroke} fill="#fff" />
      <circle cx={14} cy={20} r={1.8} fill={INK} />
      <circle cx={26} cy={20} r={4} {...stroke} fill="#fff" />
      <circle cx={26} cy={20} r={1.8} fill={INK} />
    </svg>
  );
}

export function MouthIcon({ size = 36 }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <path d="M 10 18 Q 20 30 30 18" {...stroke} fill="none" />
    </svg>
  );
}

export function TopIcon({ size = 36 }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <path
        d="M 10 12 Q 8 14 6 18 L 10 22 L 12 18 L 12 32 Q 20 34 28 32 L 28 18 L 30 22 L 34 18 Q 32 14 30 12 Q 25 11 20 12 Q 15 11 10 12 Z"
        {...stroke}
        fill="#5aa9ff"
      />
    </svg>
  );
}

export function BottomIcon({ size = 36 }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <path
        d="M 12 8 L 12 32 L 18 32 L 20 18 L 22 32 L 28 32 L 28 8 Z"
        {...stroke}
        fill="#3a2a1a"
      />
    </svg>
  );
}

export function ShoesIcon({ size = 36 }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <path
        d="M 8 24 L 8 30 Q 8 32 10 32 L 30 32 Q 32 32 32 28 L 28 24 L 20 22 L 12 22 Z"
        {...stroke}
        fill="#e0533a"
      />
      <path d="M 14 26 L 22 26" stroke="#fff" strokeWidth={2} strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function AccessoryIcon({ size = 36 }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <path d="M 20 6 L 23 16 L 33 17 L 25 23 L 28 33 L 20 27 L 12 33 L 15 23 L 7 17 L 17 16 Z" {...stroke} fill="#ffd166" />
    </svg>
  );
}

export function DiceIcon({ size = 36 }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <rect x={8} y={8} width={24} height={24} rx={5} fill="#fff" {...stroke} />
      <circle cx={14} cy={14} r={2} fill={INK} />
      <circle cx={26} cy={14} r={2} fill={INK} />
      <circle cx={20} cy={20} r={2} fill={INK} />
      <circle cx={14} cy={26} r={2} fill={INK} />
      <circle cx={26} cy={26} r={2} fill={INK} />
    </svg>
  );
}

export function CheckIcon({ size = 36 }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <path d="M 8 22 L 17 30 L 32 12" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function HomeIcon({ size = 36 }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <path d="M 6 22 L 20 8 L 34 22 L 34 32 L 6 32 Z" fill="#fffbf2" {...stroke} />
      <path d="M 16 32 L 16 22 L 24 22 L 24 32" {...stroke} />
    </svg>
  );
}

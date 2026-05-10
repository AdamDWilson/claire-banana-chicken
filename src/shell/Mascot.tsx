// Generic kid-drawn "tap me" mascot for empty slots. Stick-figure style.

const INK = '#3a2a1a';

export function Mascot({ size = 220 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 200 280"
      width={size}
      height={size * 1.27}
      role="img"
      aria-label="Tap to make a character"
      style={{ animation: 'cbc-bob 2.4s ease-in-out infinite' }}
    >
      <g
        fill="none"
        stroke={INK}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Head */}
        <circle cx={100} cy={70} r={42} fill="#fadfbf" />
        {/* Eyes */}
        <circle cx={86} cy={68} r={3.5} fill={INK} />
        <circle cx={114} cy={68} r={3.5} fill={INK} />
        {/* Smile */}
        <path d="M 86 84 Q 100 96 114 84" />
        {/* Body */}
        <path d="M 100 112 L 100 200" />
        {/* Arms — one waving */}
        <path d="M 100 140 L 60 165" />
        <path d="M 100 140 L 150 110" />
        <circle cx={150} cy={110} r={6} fill="#fadfbf" />
        {/* Legs */}
        <path d="M 100 200 L 75 260" />
        <path d="M 100 200 L 125 260" />
      </g>
      {/* "tap me!" pencil note */}
      <g
        fontFamily='"Comic Sans MS", "Marker Felt", sans-serif'
        fontSize={20}
        fill="#c44a4a"
        fontWeight={700}
      >
        <text x={156} y={70} transform="rotate(-8 156 70)">
          tap me!
        </text>
        <path
          d="M 158 74 Q 145 90 132 100"
          fill="none"
          stroke="#c44a4a"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <path
          d="M 132 100 L 138 95 M 132 100 L 138 104"
          fill="none"
          stroke="#c44a4a"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

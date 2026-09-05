type MascotProps = {
  className?: string;
  title?: string;
};

// The Turd Nerdz mascot: a friendly poop swirl in thick nerd glasses with a
// pocket protector. Placeholder illustration in brand style until the real
// logo SVG is dropped in.
export default function Mascot({ className, title = "The Turd Nerdz mascot" }: MascotProps) {
  return (
    <svg
      viewBox="0 0 300 340"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="150" cy="318" rx="90" ry="14" fill="#2B2B2B" opacity="0.12" />

      {/* swirl body */}
      <path
        d="M150 300
           C90 300 65 265 70 230
           C40 222 30 190 55 165
           C35 150 38 118 68 105
           C60 78 82 48 118 48
           C120 20 160 5 190 22
           C222 8 258 32 252 65
           C280 75 288 108 265 128
           C285 148 278 182 250 192
           C258 222 235 255 198 255
           C205 282 178 300 150 300 Z"
        fill="#6B4226"
        stroke="#2B2B2B"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* highlight swirl line */}
      <path
        d="M118 48 C110 90 140 100 130 140 C122 172 158 178 150 210"
        fill="none"
        stroke="#8A5A34"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* glasses */}
      <g stroke="#2B2B2B" strokeWidth="7" fill="#F8F1E4">
        <circle cx="112" cy="150" r="32" />
        <circle cx="196" cy="150" r="32" />
        <line x1="144" y1="148" x2="164" y2="148" strokeWidth="6" />
        <line x1="80" y1="146" x2="62" y2="138" strokeWidth="6" strokeLinecap="round" />
        <line x1="228" y1="146" x2="246" y2="138" strokeWidth="6" strokeLinecap="round" />
      </g>
      <circle cx="112" cy="150" r="10" fill="#2B2B2B" />
      <circle cx="196" cy="150" r="10" fill="#2B2B2B" />

      {/* smile */}
      <path
        d="M128 205 Q154 226 180 205"
        fill="none"
        stroke="#2B2B2B"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* pocket protector */}
      <rect x="118" y="238" width="64" height="46" rx="6" fill="#F8F1E4" stroke="#2B2B2B" strokeWidth="5" />
      <line x1="128" y1="238" x2="128" y2="204" stroke="#FF6B4A" strokeWidth="6" strokeLinecap="round" />
      <line x1="146" y1="238" x2="150" y2="200" stroke="#3FA34D" strokeWidth="6" strokeLinecap="round" />
      <line x1="164" y1="238" x2="170" y2="206" stroke="#2B2B2B" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

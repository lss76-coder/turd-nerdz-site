// Hand-drawn-style line icon set in the mascot's visual language: rounded caps,
// slightly imperfect strokes, brand colors. Used in place of emoji throughout
// the site so iconography feels illustrated rather than templated.

type IconProps = {
  className?: string;
};

const base = {
  fill: "none",
  strokeWidth: 5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconPin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <path d="M32 6c-11 0-19.5 8.6-19.5 19.2C12.5 39 32 58 32 58s19.5-19 19.5-32.8C51.5 14.6 43 6 32 6Z" />
      <circle cx="32" cy="25" r="7.5" />
    </svg>
  );
}

export function IconCamera({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <path d="M8 22c0-2.8 2.2-5 5-5h7l4-6h16l4 6h7c2.8 0 5 2.2 5 5v26c0 2.8-2.2 5-5 5H13c-2.8 0-5-2.2-5-5V22Z" />
      <circle cx="32" cy="35" r="10" />
      <path d="M45 22h4" />
    </svg>
  );
}

export function IconNoContract({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <path d="M16 8h24l8 8v40H16V8Z" />
      <path d="M40 8v8h8" />
      <path d="M23 30h18M23 38h18M23 46h10" />
      <path d="M10 10l44 44" />
    </svg>
  );
}

export function IconSanitize({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <path d="M26 6h12v10l6 6v30a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V22l6-6V6Z" />
      <path d="M24 34h16" />
      <path d="M46 12l3 3M50 20l4 1M45 28l4-1" />
    </svg>
  );
}

export function IconBolt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <path d="M34 6 14 36h14l-4 22 22-32H32l2-20Z" />
    </svg>
  );
}

export function IconGift({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <rect x="10" y="24" width="44" height="34" rx="3" />
      <path d="M10 34h44" />
      <path d="M32 24v34" />
      <path d="M32 24c-3-10-9-14-13-12-4 2-2 10 4 12h9Z" />
      <path d="M32 24c3-10 9-14 13-12 4 2 2 10-4 12h-9Z" />
    </svg>
  );
}

export function IconPaw({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} strokeWidth="0" fill="currentColor">
      <ellipse cx="32" cy="42" rx="15" ry="12" />
      <ellipse cx="12" cy="26" rx="7" ry="8.5" />
      <ellipse cx="27" cy="14" rx="7" ry="8.5" />
      <ellipse cx="45" cy="14" rx="7" ry="8.5" />
      <ellipse cx="56" cy="28" rx="6.5" ry="8" />
    </svg>
  );
}

export function IconCalendar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <rect x="8" y="12" width="48" height="44" rx="4" />
      <path d="M8 24h48" />
      <path d="M20 6v10M44 6v10" />
      <path d="M18 34h6M30 34h6M42 34h4M18 44h6M30 44h6" />
    </svg>
  );
}

export function IconHandshake({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <path d="M6 28l12-8 8 4 8-6 10 6" />
      <path d="M18 20v18l10 8 4-4-12-10" />
      <path d="M44 24l12 8-6 10-4-2" />
      <path d="M28 38l6 6a4 4 0 0 0 6-5" />
    </svg>
  );
}

export function IconCheckBadge({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <path d="M32 6l6 4h7l3 6 6 4-2 7 2 7-6 4-3 6h-7l-6 4-6-4h-7l-3-6-6-4 2-7-2-7 6-4 3-6h7l6-4Z" />
      <path d="M22 33l7 7 14-14" />
    </svg>
  );
}

export function IconLeaf({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <path d="M12 52C10 30 26 10 52 10c2 22-14 42-40 42Z" />
      <path d="M14 50C26 38 34 28 46 16" />
    </svg>
  );
}

export function IconDog({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <path d="M18 26c-4-6-10-8-12-4-2 4 2 10 8 12" />
      <path d="M46 26c4-6 10-8 12-4 2 4-2 10-8 12" />
      <path d="M16 30c0-10 7-18 16-18s16 8 16 18c0 12-7 20-16 20s-16-8-16-20Z" />
      <circle cx="26" cy="28" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="38" cy="28" r="2.2" fill="currentColor" stroke="none" />
      <path d="M27 37c2 2 8 2 10 0" />
    </svg>
  );
}

export function IconHome({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <path d="M8 30 32 10l24 20" />
      <path d="M14 26v28h36V26" />
      <path d="M26 54V38h12v16" />
    </svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <circle cx="32" cy="32" r="24" />
      <path d="M32 18v14l10 6" />
    </svg>
  );
}

export function IconBroom({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <path d="M40 6 20 44" />
      <path d="M12 58c2-10 8-16 16-16 6 0 10 3 10 8" />
      <path d="M10 46l8 4M14 52l8 3M20 58l6 2" />
    </svg>
  );
}

export function IconTree({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base} stroke="currentColor">
      <path d="M32 58V40" />
      <path d="M20 44c-2-8 3-14 8-15-3-6 1-13 8-13 6 0 10 5 8 11 5 0 9 5 8 11-1 6-7 9-13 8-4 4-11 4-19-2Z" />
    </svg>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.6l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.7 5.9 21.1l1.5-6.8-5.2-4.7 6.9-.7L12 2.6Z" />
    </svg>
  );
}

export function StarRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 text-coral ${className}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} className="h-4 w-4" />
      ))}
    </div>
  );
}

export function IconArrowSquiggle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M3 28c14-18 28-18 40-6 10 10 22 12 34 2 8-6 18-8 28-4" />
      <path d="M92 12l13 8-9 12" />
    </svg>
  );
}

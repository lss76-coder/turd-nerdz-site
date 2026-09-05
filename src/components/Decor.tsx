import { IconPaw } from "./icons";

// Angled divider between sections — replaces the flat stacked-rectangle look
// with a torn/organic edge, drawn once and reused.
export function WaveDivider({
  color = "var(--color-cream)",
  flip = false,
  className = "",
}: {
  color?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none w-full overflow-hidden leading-[0] ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="h-[36px] w-full sm:h-[52px]"
      >
        <path
          d="M0,32 C120,60 240,4 360,26 C480,48 600,8 720,22 C840,36 960,6 1080,24 C1140,33 1170,20 1200,28 L1200,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

// A handful of loosely-scattered paw prints, rotated at odd angles, sitting
// at low opacity behind content — like a texture stamp rather than a UI icon.
export function PawScatter({ className = "" }: { className?: string }) {
  const paws = [
    { top: "8%", left: "4%", size: 34, rot: -18, opacity: 0.10 },
    { top: "70%", left: "10%", size: 22, rot: 12, opacity: 0.08 },
    { top: "20%", left: "92%", size: 28, rot: 25, opacity: 0.09 },
    { top: "80%", left: "88%", size: 40, rot: -8, opacity: 0.07 },
    { top: "45%", left: "50%", size: 20, rot: 40, opacity: 0.06 },
  ];

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {paws.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          <IconPaw className="h-full w-full" />
        </span>
      ))}
    </div>
  );
}

// A rotated, hand-labeled sticker badge — tape-corner styling instead of a
// plain rounded pill, for callouts that should feel stuck-on rather than
// generated.
export function Sticker({
  children,
  rotate = -4,
  tone = "coral",
  className = "",
}: {
  children: React.ReactNode;
  rotate?: number;
  tone?: "coral" | "green" | "cream";
  className?: string;
}) {
  const tones: Record<string, string> = {
    coral: "bg-coral text-white",
    green: "bg-green text-white",
    cream: "bg-white text-teal border-2 border-teal/15",
  };

  return (
    <span
      className={`inline-block rounded-md px-4 py-2 font-hand text-lg font-bold shadow-md ${tones[tone]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

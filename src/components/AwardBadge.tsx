import { IconPaw } from "./icons";

// A rotating seal-style badge: circular text spins slowly around a fixed
// center icon, like a stamp of approval. Pure CSS animation, no libraries.
export default function AwardBadge({
  text = "LOCALLY LOVED  •  5-STAR RATED  •  NO CONTRACTS  •  ",
  centerLabel = "2026",
  className = "",
}: {
  text?: string;
  centerLabel?: string;
  className?: string;
}) {
  const id = "award-badge-path";

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" className="h-full w-full animate-spin-slow">
        <path
          id={id}
          fill="none"
          d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
        />
        <text fill="#fff" className="font-heading" fontSize="13" fontWeight="700" letterSpacing="2">
          <textPath href={`#${id}`} startOffset="0%">
            {text.repeat(2)}
          </textPath>
        </text>
      </svg>

      <div className="absolute flex h-[52%] w-[52%] flex-col items-center justify-center rounded-full bg-coral text-white shadow-lg">
        <IconPaw className="h-6 w-6" />
        <span className="mt-0.5 font-heading text-xs font-extrabold">{centerLabel}</span>
      </div>
    </div>
  );
}

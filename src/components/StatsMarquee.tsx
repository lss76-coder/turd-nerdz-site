import { IconCamera, IconGift, IconHandshake, IconPaw, IconStar } from "./icons";
import { REFERRAL_CREDIT } from "@/lib/config";

const ITEMS = [
  { Icon: IconStar, text: "5.0-Star Rated" },
  { Icon: IconPaw, text: "Locally Owned in Bluewater Bay" },
  { Icon: IconHandshake, text: "No-Contract Guarantee" },
  { Icon: IconCamera, text: "Photo Proof Every Visit" },
  { Icon: IconGift, text: `Give $${REFERRAL_CREDIT}, Get $${REFERRAL_CREDIT}` },
  { Icon: IconStar, text: "Pet-Safe, Family Owned" },
];

function Row() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span
          key={i}
          className="mx-4 flex shrink-0 items-center gap-2 font-heading text-sm font-bold text-cream sm:text-base"
        >
          <item.Icon className="h-5 w-5 text-coral" />
          {item.text}
          <span className="ml-4 text-cream/30">•</span>
        </span>
      ))}
    </>
  );
}

// A single continuous left-moving ticker — never reverses, never alternates
// direction — so everything reads as one consistent flow.
export default function StatsMarquee() {
  return (
    <div className="overflow-hidden">
      <div className="flex w-max animate-marquee">
        <div className="flex shrink-0">
          <Row />
        </div>
        <div className="flex shrink-0" aria-hidden>
          <Row />
        </div>
      </div>
    </div>
  );
}

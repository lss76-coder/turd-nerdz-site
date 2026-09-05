import { WaveDivider } from "@/components/Decor";
import { IconCamera, IconNoContract, IconPin, IconSanitize } from "@/components/icons";

const ITEMS = [
  { Icon: IconPin, label: "Locally Run in Bluewater Bay" },
  { Icon: IconCamera, label: "Photo After Every Visit" },
  { Icon: IconNoContract, label: "No Contracts" },
  { Icon: IconSanitize, label: "Kennel-Grade Tool Sanitizing" },
];

export default function TrustBar() {
  return (
    <>
      <WaveDivider color="var(--color-cream-dark)" />
      <section className="bg-cream-dark">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
          {ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 text-center">
              <item.Icon className="h-8 w-8 text-teal" />
              <span className="font-heading text-xs font-bold text-teal sm:text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>
      <WaveDivider color="var(--color-cream-dark)" flip />
    </>
  );
}

import AwardBadge from "@/components/AwardBadge";
import StatsMarquee from "@/components/StatsMarquee";

export default function AwardsSection() {
  return (
    <section className="border-y-2 border-cream/10 bg-teal py-4">
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-4">
        <div className="h-20 w-20 shrink-0 sm:h-24 sm:w-24">
          <AwardBadge />
        </div>
        <div className="min-w-0 flex-1">
          <StatsMarquee />
        </div>
      </div>
    </section>
  );
}

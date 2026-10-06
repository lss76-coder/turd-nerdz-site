import CTAButton from "@/components/CTAButton";
import { PawScatter } from "@/components/Decor";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-green-dark grain">
      <PawScatter className="text-cream" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-20">
        <h2 className="font-heading text-3xl font-extrabold text-cream sm:text-4xl">
          Get Your Yard Back — 50% Off Your First Month
        </h2>
        <p className="max-w-lg text-cream/80">
          Limited to our first 10 new customers. Sign up for any recurring
          plan while a spot&apos;s still open — no contracts, no catch.
        </p>
        <CTAButton href="/quote" size="lg">
          Get Instant Quote →
        </CTAButton>
      </div>
    </section>
  );
}

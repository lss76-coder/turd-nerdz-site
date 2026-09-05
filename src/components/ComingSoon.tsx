import CTAButton from "@/components/CTAButton";
import Mascot from "@/components/Mascot";

export default function ComingSoon({
  title,
  blurb,
}: {
  title: string;
  blurb: string;
}) {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-14 text-center">
      <Mascot className="h-24 w-24 animate-wiggle" />
      <h1 className="mt-4 font-heading text-3xl font-extrabold text-teal sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-charcoal/70">{blurb}</p>
      <CTAButton href="/quote" size="lg" className="mt-8">
        Get Instant Quote →
      </CTAButton>
    </section>
  );
}

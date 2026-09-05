import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import ScrollReveal from "@/components/ScrollReveal";
import { IconPaw } from "@/components/icons";
import { PRICING } from "@/lib/config";

const RECURRING_PERKS = [
  "No more dog waste in the yard",
  "Locally run — not a franchise",
  "No contracts, no hidden fees",
  "Scoop on your schedule",
  "Photo proof every visit",
  "Kennel-grade tool sanitizing, included",
];

export default function ServicesPreview() {
  return (
    <section className="relative overflow-hidden px-4 py-10 sm:py-14">
      <IconPaw className="animate-drift absolute left-6 top-4 hidden h-10 w-10 text-teal/10 lg:block" />
      <IconPaw className="animate-drift-slow absolute bottom-8 right-10 hidden h-14 w-14 text-coral/10 lg:block" />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-heading text-3xl font-extrabold text-teal sm:text-4xl">
              Our Services
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-charcoal/70">
              From weekly scooping to a one-time yard rescue, here&apos;s how we
              keep Bluewater Bay &amp; Niceville yards clean.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-start">
          <ScrollReveal direction="left" delay={0}>
            <div className="rounded-2xl border-2 border-coral/30 bg-coral/5 p-7 shadow-lg lg:-translate-y-3">
              <span
                className="inline-block rounded-full bg-coral px-3 py-1 font-heading text-xs font-bold text-white"
                style={{ transform: "rotate(-2deg)" }}
              >
                Most Popular
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-teal">
                Recurring Scooping
              </h3>
              <p className="mt-1 text-sm text-charcoal/70">
                Weekly or biweekly visits, first cleanup free.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
                {RECURRING_PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <span className="mt-0.5 text-green" aria-hidden>✓</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <CTAButton href="/quote" className="mt-6 w-full">
                Get Quote
              </CTAButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="rounded-2xl border-2 border-teal/10 bg-white p-7">
              <span className="inline-block rounded-full bg-green/15 px-3 py-1 font-heading text-xs font-bold text-green-dark">
                One-Time
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-teal">Yard Reset</h3>
              <p className="mt-1 text-sm text-charcoal/70">
                Overgrown yard? We&apos;ll do a deep cleanup — flat $
                {PRICING.oneTimeCleanup}, discounted if you sign up for
                recurring service too.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-block font-heading text-sm font-bold text-teal underline underline-offset-4 hover:text-coral"
              >
                Learn more →
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <div className="rounded-2xl border-2 border-teal/10 bg-white p-7">
              <span className="inline-block rounded-full bg-teal/10 px-3 py-1 font-heading text-xs font-bold text-teal">
                Commercial
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-teal">
                Rental &amp; Property Turnover
              </h3>
              <p className="mt-1 text-sm text-charcoal/70">
                Vacation rentals and HOA common areas, cleaned and sanitized
                between guests or on a set schedule.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-block font-heading text-sm font-bold text-teal underline underline-offset-4 hover:text-coral"
              >
                Learn more →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import { IconBroom, IconCalendar, IconHome, IconSanitize } from "@/components/icons";
import { DEODORIZER_MONTHLY, PRICING } from "@/lib/config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Recurring dog waste removal, one-time yard resets, optional yard deodorizing, and commercial pet station service in Bluewater Bay & Niceville, FL.",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    Icon: IconCalendar,
    tag: "Most Popular",
    title: "Recurring Residential Scooping",
    price: `From $${PRICING.weeklyBase}/month`,
    desc: "The core of what we do. Weekly, biweekly, monthly, or twice-a-week visits that keep your yard consistently clean — no buildup, no surprises.",
    bullets: [
      "Weekly, biweekly, monthly, or twice-weekly scheduling",
      "First cleanup free with signup",
      "Photo confirmation every visit",
      "No contracts — pause or cancel anytime",
      `+$${PRICING.perDogWeekly}/month per additional dog (at the weekly rate)`,
    ],
  },
  {
    Icon: IconBroom,
    tag: "One-Time",
    title: "Yard Reset (Deep Cleanup)",
    price: `$${PRICING.oneTimeCleanup} flat`,
    desc: "For the yard that's gotten away from you — moved into a new place, been out of town, or just fallen behind. One thorough visit gets you back to zero.",
    bullets: [
      "Full-yard deep clean, corner to corner",
      "Great before hosting, listing, or landscaping",
      "Discounted if you also sign up for recurring service",
      "No commitment required",
    ],
  },
  {
    Icon: IconSanitize,
    tag: "Add-On",
    title: "Yard Deodorizing",
    price: `+$${DEODORIZER_MONTHLY}/month`,
    desc: "Pet-safe, EPA-approved treatment that neutralizes odor and bacteria at the source — not just masking smell, actually treating it. (Kennel-grade tool and shoe sanitizing between every yard is already included on all plans, free.)",
    bullets: [
      "Safe for pets, kids, and grass",
      "Targets high-traffic and shaded problem spots",
      "Add it to any recurring plan",
      "Especially useful during Florida's rainy season",
    ],
  },
  {
    Icon: IconHome,
    tag: "Commercial",
    title: "Rental & Property Turnover",
    price: "Custom quote",
    desc: "For vacation rentals, HOA common areas, and multi-unit properties. Scheduled cleanups that keep shared and guest-facing spaces spotless.",
    bullets: [
      "Turnover cleanups between guests",
      "Recurring HOA common-area service",
      "Flexible scheduling around bookings",
      "Single point of contact for property managers",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Services Built Around Your Yard"
        subtitle="From weekly scooping to a one-time rescue mission, here's every way we can help."
      >
        <CTAButton href="/quote" variant="secondary">
          Get Your Instant Quote →
        </CTAButton>
      </PageHero>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-2xl border-2 border-teal/10 bg-white p-7">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <s.Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-coral/10 px-3 py-1 font-heading text-xs font-bold text-coral">
                  {s.tag}
                </span>
              </div>
              <h2 className="mt-4 font-heading text-xl font-bold text-teal">{s.title}</h2>
              <p className="mt-1 font-heading text-sm font-bold text-green-dark">{s.price}</p>
              <p className="mt-2 text-sm text-charcoal/70">{s.desc}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-charcoal/80">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-0.5 text-green" aria-hidden>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border-2 border-dashed border-teal/20 bg-white p-6 text-center sm:p-8">
          <h3 className="font-heading text-lg font-bold text-teal">
            Not Sure Which Plan Fits?
          </h3>
          <p className="mt-1.5 text-sm text-charcoal/70">
            Our instant quote tool walks you through it in about 30 seconds —
            no phone call required.
          </p>
          <CTAButton href="/quote" className="mt-4">
            Get Instant Quote →
          </CTAButton>
        </div>
      </section>
    </>
  );
}

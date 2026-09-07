import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import { IconCheckBadge } from "@/components/icons";
import PromoBanner from "@/components/PromoBanner";
import {
  DEODORIZER_MONTHLY,
  Frequency,
  PRICING,
  calculateQuote,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Clear, upfront pricing for dog waste removal in Bluewater Bay & Niceville, FL — weekly, biweekly, monthly, and twice-a-week plans, no hidden fees.",
  alternates: { canonical: "/pricing" },
};

const FREQUENCY_COLUMNS: { value: Frequency; label: string; blurb: string }[] = [
  { value: "weekly", label: "Weekly", blurb: "Most popular" },
  { value: "twiceWeekly", label: "Twice a Week", blurb: "For busy yards" },
  { value: "biweekly", label: "Biweekly", blurb: "Every other week" },
  { value: "monthly", label: "Monthly", blurb: "Once a month" },
];

const DOG_ROWS = [1, 2, 3, 4];

const ADDONS = [
  { name: "Yard Deodorizing", price: `+$${DEODORIZER_MONTHLY}/month` },
  { name: "Kennel-Grade Tool Sanitizing", price: "Included free, every visit" },
  { name: "One-Time Yard Reset", price: `$${PRICING.oneTimeCleanup} flat` },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Clear & Upfront"
        title="Pricing That Fits Your Yard"
        subtitle="No hidden fees, no surprise add-ons, no long-term contracts. Pick a frequency, see the price."
      >
        <PromoBanner className="mb-4" />
        <CTAButton href="/quote" variant="secondary">
          Skip The Table, Get My Quote →
        </CTAButton>
      </PageHero>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
        {/* Mobile: stacked cards, no horizontal scrolling needed */}
        <div className="space-y-4 sm:hidden">
          {DOG_ROWS.map((dogs) => (
            <div key={dogs} className="rounded-2xl border-2 border-teal/10 bg-white p-4">
              <h3 className="font-heading text-base font-bold text-teal">
                {dogs} dog{dogs > 1 ? "s" : ""}
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {FREQUENCY_COLUMNS.map((col) => (
                  <div key={col.value} className="rounded-xl bg-cream/60 p-3">
                    <span className="block font-heading text-xs font-bold uppercase tracking-wide text-charcoal/60">
                      {col.label}
                    </span>
                    <span className="font-heading text-lg font-bold text-charcoal">
                      ${calculateQuote(dogs, col.value).monthly}
                      <span className="text-xs font-normal text-charcoal/50">/mo</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop/tablet: full table */}
        <div className="hidden overflow-x-auto rounded-2xl border-2 border-teal/10 bg-white sm:block">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b-2 border-teal/10 bg-teal/5">
                <th className="px-5 py-4 font-heading text-sm font-bold text-teal">
                  Dogs
                </th>
                {FREQUENCY_COLUMNS.map((col) => (
                  <th key={col.value} className="px-5 py-4">
                    <span className="block font-heading text-sm font-bold text-teal">
                      {col.label}
                    </span>
                    <span className="block text-xs font-normal text-charcoal/50">
                      {col.blurb}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DOG_ROWS.map((dogs, i) => (
                <tr
                  key={dogs}
                  className={i % 2 === 1 ? "bg-cream/60" : ""}
                >
                  <td className="px-5 py-4 font-heading font-bold text-teal">
                    {dogs} dog{dogs > 1 ? "s" : ""}
                  </td>
                  {FREQUENCY_COLUMNS.map((col) => (
                    <td key={col.value} className="px-5 py-4 font-heading text-lg font-bold text-charcoal">
                      ${calculateQuote(dogs, col.value).monthly}
                      <span className="text-xs font-normal text-charcoal/50">/mo</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-sm text-charcoal/60">
          First cleanup free with any new recurring plan. 5+ dogs? {" "}
          <a href="/contact" className="font-semibold text-teal underline underline-offset-4">
            Contact us
          </a>{" "}
          for a custom quote.
        </p>

        <div className="mt-12 rounded-2xl border-2 border-teal/10 bg-white p-6 sm:p-8">
          <h2 className="font-heading text-xl font-bold text-teal">Optional Add-Ons</h2>
          <div className="mt-4 divide-y divide-teal/10">
            {ADDONS.map((a) => (
              <div key={a.name} className="flex items-center justify-between gap-4 py-3">
                <span className="flex items-center gap-2 text-charcoal/85">
                  <IconCheckBadge className="h-5 w-5 shrink-0 text-green-dark" />
                  {a.name}
                </span>
                <span className="font-heading font-bold text-teal">{a.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <CTAButton href="/quote" size="lg">
            Get My Exact Price →
          </CTAButton>
          <p className="mt-3 text-sm text-charcoal/50">
            Takes about 30 seconds — three taps and a phone number.
          </p>
        </div>
      </section>
    </>
  );
}

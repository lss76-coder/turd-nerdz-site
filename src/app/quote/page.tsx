import type { Metadata } from "next";
import QuoteFlow from "./QuoteFlow";

export const metadata: Metadata = {
  title: "Instant Quote",
  description:
    "Get an instant price for dog waste removal in Bluewater Bay & Niceville, FL. A few quick questions, no phone call needed.",
  alternates: { canonical: "/quote" },
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ zip?: string }>;
}) {
  const { zip } = await searchParams;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-extrabold text-teal sm:text-4xl">
          Get Your Instant Quote
        </h1>
        <p className="mt-2 text-charcoal/70">
          A few quick questions. No dropdowns, no phone tag, no tax forms.
        </p>
      </div>
      <QuoteFlow zip={zip} />
    </section>
  );
}

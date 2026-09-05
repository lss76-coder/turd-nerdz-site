import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { BUSINESS_NAME, CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${BUSINESS_NAME}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <section className="mx-auto max-w-3xl space-y-5 px-4 py-14 text-charcoal/80 sm:py-16">
        <p className="rounded-xl border-2 border-dashed border-teal/20 bg-white p-4 text-sm text-charcoal/60">
          Placeholder text — replace with terms reviewed by an actual
          attorney before taking payments or signing customers up for real.
        </p>
        <h2 className="font-heading text-xl font-bold text-teal">Service Agreement</h2>
        <p>
          By submitting a quote or booking request through this site, you&apos;re
          asking {BUSINESS_NAME} to provide pet waste removal service at the
          address you provide. Nothing is booked or charged until we confirm
          your first visit directly with you.
        </p>
        <h2 className="font-heading text-xl font-bold text-teal">No Long-Term Contract</h2>
        <p>
          Recurring service is month-to-month. You can pause, change your
          plan, or cancel at any time by contacting us — no cancellation fee.
        </p>
        <h2 className="font-heading text-xl font-bold text-teal">Access & Safety</h2>
        <p>
          You&apos;re responsible for giving us accurate access instructions
          (gate codes, dog whereabouts, etc.) and for keeping pets secured
          during scheduled visits for everyone&apos;s safety.
        </p>
        <h2 className="font-heading text-xl font-bold text-teal">Questions</h2>
        <p>
          Reach us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-coral">
            {CONTACT_EMAIL}
          </a>{" "}
          with anything about these terms.
        </p>
      </section>
    </>
  );
}

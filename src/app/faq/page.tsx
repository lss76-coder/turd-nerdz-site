import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import Accordion from "@/components/Accordion";
import JsonLd from "@/components/JsonLd";
import { FAQ_CATEGORIES } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about The Turd Nerdz pet waste removal service in Bluewater Bay & Niceville, FL — service area, pricing, cancellation, and more.",
  alternates: { canonical: "/faq" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHero
        eyebrow="Questions? Answered."
        title="Frequently Asked Questions"
        subtitle="Everything you'd want to know before you sign up — service area, pricing, pets, and what happens on a rainy day."
      >
        <CTAButton href="/quote" variant="secondary">
          Skip the reading, get a quote →
        </CTAButton>
      </PageHero>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:py-16">
        {FAQ_CATEGORIES.map((cat) => (
          <div key={cat.title} className="mb-10 last:mb-0">
            <h2 className="mb-4 font-heading text-xl font-bold text-teal">{cat.title}</h2>
            <Accordion items={cat.items} />
          </div>
        ))}

        <div className="mt-12 rounded-2xl border-2 border-dashed border-teal/20 bg-white p-6 text-center sm:p-8">
          <h3 className="font-heading text-lg font-bold text-teal">
            Still have a question?
          </h3>
          <p className="mt-1.5 text-sm text-charcoal/70">
            We&apos;re a phone call, text, or email away — a real person answers.
          </p>
          <CTAButton href="/contact" className="mt-4">
            Contact Us
          </CTAButton>
        </div>
      </section>
    </>
  );
}

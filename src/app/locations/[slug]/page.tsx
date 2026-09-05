import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import Accordion from "@/components/Accordion";
import { IconHome, IconPin } from "@/components/icons";
import JsonLd from "@/components/JsonLd";
import { LOCATIONS, getLocationBySlug } from "@/lib/locations";
import { BUSINESS_NAME, PHONE_TEL, SITE_URL } from "@/lib/config";

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) return {};
  return {
    title: loc.headline,
    description: `${loc.intro[0]} Serving ${loc.name}, ${loc.state} with weekly and biweekly pet waste removal.`,
    alternates: { canonical: `/locations/${loc.slug}` },
    keywords: loc.keywords,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) notFound();

  const otherLocations = LOCATIONS.filter((l) => l.slug !== loc.slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Pet Waste Removal",
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_NAME,
      telephone: PHONE_TEL,
      url: SITE_URL,
    },
    areaServed: { "@type": "City", name: `${loc.name}, ${loc.state}` },
    url: `${SITE_URL}/locations/${loc.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loc.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <PageHero eyebrow={`${loc.name}, ${loc.state}`} title={loc.headline}>
        <CTAButton href="/quote" variant="secondary">
          Get Your Instant Quote →
        </CTAButton>
      </PageHero>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:py-16">
        <div className="space-y-4 text-base leading-relaxed text-charcoal/85">
          {loc.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-teal/10 bg-white p-6">
            <div className="flex items-center gap-2">
              <IconHome className="h-5 w-5 text-teal" />
              <h2 className="font-heading text-base font-bold text-teal">
                Neighborhoods We Cover
              </h2>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-charcoal/75">
              {loc.neighborhoods.map((n) => (
                <li key={n}>• {n}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-teal/10 bg-white p-6">
            <div className="flex items-center gap-2">
              <IconPin className="h-5 w-5 text-teal" />
              <h2 className="font-heading text-base font-bold text-teal">Local Landmarks</h2>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-charcoal/75">
              {loc.landmarks.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </div>
        </div>

        {loc.sections.map((section) => (
          <div key={section.title} className="mt-10">
            <h2 className="font-heading text-xl font-bold text-teal">{section.title}</h2>
            <div className="mt-3 space-y-3 text-base leading-relaxed text-charcoal/85">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12">
          <h2 className="mb-4 font-heading text-xl font-bold text-teal">
            {loc.name} FAQ
          </h2>
          <Accordion items={loc.faq} />
        </div>

        <div className="mt-12 rounded-2xl border-2 border-dashed border-teal/20 bg-white p-6 text-center sm:p-8">
          <h3 className="font-heading text-lg font-bold text-teal">
            Ready For A Cleaner Yard In {loc.name}?
          </h3>
          <p className="mt-1.5 text-sm text-charcoal/70">
            First cleanup free with any new recurring plan.
          </p>
          <CTAButton href="/quote" className="mt-4">
            Get Instant Quote →
          </CTAButton>
        </div>

        {otherLocations.length > 0 && (
          <div className="mt-10 text-center text-sm text-charcoal/60">
            Also serving:{" "}
            {otherLocations.map((l) => (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}`}
                className="font-semibold text-teal underline underline-offset-4"
              >
                {l.name}, {l.state}
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

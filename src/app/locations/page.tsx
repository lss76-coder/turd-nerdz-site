import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { IconPin } from "@/components/icons";
import { LOCATIONS } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "The Turd Nerdz provides pet waste removal in Bluewater Bay and Niceville, FL — see local service details for your neighborhood.",
  alternates: { canonical: "/locations" },
};

export default function LocationsIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Where We Work"
        title="Serving Bluewater Bay & Niceville, FL"
        subtitle="Local details for each area we cover — neighborhoods, landmarks, and what to expect from service near you."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="block rounded-2xl border-2 border-teal/10 bg-white p-6 transition-transform hover:-translate-y-1 hover:border-coral/40"
            >
              <IconPin className="h-8 w-8 text-teal" />
              <h2 className="mt-3 font-heading text-xl font-bold text-teal">
                {loc.name}, {loc.state}
              </h2>
              <p className="mt-1.5 text-sm text-charcoal/70">{loc.headline}</p>
              <span className="mt-3 inline-block font-heading text-sm font-bold text-coral">
                View local service details →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

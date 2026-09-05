import Link from "next/link";
import ZipQuoteForm from "./ZipQuoteForm";
import { LOCATIONS } from "@/lib/locations";

export default function ServiceAreaCallout() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="rounded-3xl border-2 border-teal/10 bg-white p-8 text-center sm:p-12">
        <span className="font-heading text-sm font-bold uppercase tracking-wide text-green-dark">
          Get A Quote
        </span>
        <h2 className="mx-auto mt-2 max-w-lg font-heading text-3xl font-extrabold text-teal sm:text-4xl">
          Enter your ZIP and see if we&apos;re in your neighborhood
        </h2>

        <div className="mx-auto mt-6 max-w-md">
          <ZipQuoteForm />
        </div>

        <div className="mx-auto mt-10 max-w-2xl border-t-2 border-teal/10 pt-8">
          <h3 className="font-heading text-lg font-bold text-teal">
            Currently Serving
          </h3>
          <p className="mt-2 text-sm text-charcoal/70">
            Bluewater Bay, Niceville, and nearby pockets of Okaloosa County —
            and we&apos;re adding neighborhoods as fast as we can scoop. Not
            listed yet? Enter your ZIP above and we&apos;ll let you know.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="font-heading text-sm font-bold text-teal underline underline-offset-4 hover:text-coral"
              >
                {loc.name} service details →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

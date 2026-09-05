import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "./ContactForm";
import CTAButton from "@/components/CTAButton";
import { IconCalendar, IconPin } from "@/components/icons";
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL, SERVICE_AREA } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact The Turd Nerdz — call, text, or email us about pet waste removal service in Bluewater Bay & Niceville, FL.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Talk To An Actual Person"
        subtitle="No phone trees, no chatbots pretending to be human. Call, text, email, or use the form below."
      >
        <p className="text-sm text-cream/80">
          In a hurry? Skip the back-and-forth.
        </p>
        <CTAButton href="/quote" variant="secondary" className="mt-3">
          Get Instant Quote →
        </CTAButton>
      </PageHero>

      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:py-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-teal/10 bg-white p-6">
            <h2 className="font-heading text-lg font-bold text-teal">Reach Us Directly</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <span className="block font-heading text-xs font-bold uppercase tracking-wide text-charcoal/50">
                  Phone or Text
                </span>
                <a href={`tel:${PHONE_TEL}`} className="text-lg font-bold text-coral">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <span className="block font-heading text-xs font-bold uppercase tracking-wide text-charcoal/50">
                  Email
                </span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-teal">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-teal/10 bg-white p-6">
            <div className="flex items-center gap-2">
              <IconCalendar className="h-5 w-5 text-teal" />
              <h2 className="font-heading text-lg font-bold text-teal">Hours</h2>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-charcoal/75">
              <li>Monday – Friday: 8am – 6pm</li>
              <li>Saturday: 9am – 2pm</li>
              <li>Sunday: Closed (routes resume Monday)</li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-teal/10 bg-white p-6">
            <div className="flex items-center gap-2">
              <IconPin className="h-5 w-5 text-teal" />
              <h2 className="font-heading text-lg font-bold text-teal">Service Area</h2>
            </div>
            <p className="mt-2 text-sm text-charcoal/75">{SERVICE_AREA}</p>
            <p className="mt-1 text-xs text-charcoal/50">
              Not sure if you&apos;re covered? Use the ZIP checker on our{" "}
              <a href="/quote" className="underline">
                quote page
              </a>
              .
            </p>
          </div>
        </div>

        <div className="rounded-3xl border-2 border-teal/10 bg-white p-6 sm:p-8">
          <h2 className="font-heading text-xl font-bold text-teal">Send Us A Message</h2>
          <p className="mt-1 text-sm text-charcoal/70">
            We usually reply the same day.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

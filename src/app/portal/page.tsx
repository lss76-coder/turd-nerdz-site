import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import NotifyForm from "./NotifyForm";
import { IconBolt, IconCalendar, IconCamera, IconGift, IconHandshake, IconPin } from "@/components/icons";
// TODO: swap this page for an embed/redirect to the real CRM client portal
// (e.g. Sweep&Go or Jobber) once we sign up for one. Everything below is a
// preview of what that portal will offer — no login system exists yet.

export const metadata: Metadata = {
  title: "Client Portal",
  description:
    "The Turd Nerdz client portal is coming soon — manage your service, schedule, billing, and photo history in one place.",
  alternates: { canonical: "/portal" },
};

const FEATURES = [
  {
    Icon: IconCalendar,
    title: "See Your Schedule",
    desc: "View upcoming visits, next cleanup date, and your current plan at a glance.",
  },
  {
    Icon: IconCamera,
    title: "Photo History",
    desc: "Every visit's gate photo, saved and searchable — proof your yard was left locked and secure, no digging through texts.",
  },
  {
    Icon: IconHandshake,
    title: "Pause, Skip, or Cancel",
    desc: "Manage your own plan without calling anyone. Going on vacation? Pause it yourself.",
  },
  {
    Icon: IconBolt,
    title: "Instant Billing",
    desc: "See invoices, update payment methods, and pay online — no paper, no phone calls.",
  },
  {
    Icon: IconGift,
    title: "Referral Tracking",
    desc: "See your referral credits and where each one came from, right in your account.",
  },
  {
    Icon: IconPin,
    title: "Update Access Info",
    desc: "Change your gate code, dog notes, or access instructions anytime — no need to call or wait for your next visit.",
  },
];

export default function PortalPage() {
  return (
    <>
      <PageHero
        eyebrow="Coming Soon"
        title="Your Client Portal Is On The Way"
        subtitle="We're building a proper self-serve portal — schedule, billing, and your full photo history in one place. Until it's live, we handle all of this personally."
      >
        <div className="mx-auto max-w-md">
          <NotifyForm />
        </div>
      </PageHero>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
        <h2 className="text-center font-heading text-2xl font-bold text-teal sm:text-3xl">
          What The Portal Will Do
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-charcoal/70">
          Here&apos;s what&apos;s on the roadmap. None of it is live yet — but you can
          get everything below today by just texting or emailing us.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border-2 border-teal/10 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal">
                <f.Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-heading text-base font-bold text-teal">{f.title}</h3>
              <p className="mt-1.5 text-sm text-charcoal/70">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border-2 border-dashed border-teal/20 bg-white p-6 text-center sm:p-8">
          <h3 className="font-heading text-lg font-bold text-teal">
            Need Something From This List Right Now?
          </h3>
          <p className="mt-1.5 text-sm text-charcoal/70">
            Skip the wait — reach out directly and we&apos;ll take care of it by
            hand until the portal launches.
          </p>
          <CTAButton href="/contact" className="mt-4">
            Contact Us
          </CTAButton>
        </div>
      </section>
    </>
  );
}

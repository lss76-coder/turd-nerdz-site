import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { BUSINESS_NAME, CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${BUSINESS_NAME}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="mx-auto max-w-3xl space-y-5 px-4 py-14 text-charcoal/80 sm:py-16">
        <p className="rounded-xl border-2 border-dashed border-teal/20 bg-white p-4 text-sm text-charcoal/60">
          Placeholder text — replace with a policy reviewed by an actual
          attorney before collecting real customer data at scale.
        </p>
        <h2 className="font-heading text-xl font-bold text-teal">What We Collect</h2>
        <p>
          When you request a quote or book service, we collect your name,
          address, phone number, email, and yard/pet details you provide —
          only what&apos;s needed to schedule and complete your service.
        </p>
        <h2 className="font-heading text-xl font-bold text-teal">How We Use It</h2>
        <p>
          Your information is used to send you a quote, schedule visits,
          confirm access details with our technicians, and contact you about
          your service. We don&apos;t sell your information to third parties.
        </p>
        <h2 className="font-heading text-xl font-bold text-teal">How It&apos;s Stored</h2>
        <p>
          Submissions from this site are currently sent directly to us by
          email. As we grow, this may move to a dedicated customer database —
          this policy will be updated if that changes what we collect or how
          it&apos;s stored.
        </p>
        <h2 className="font-heading text-xl font-bold text-teal">Questions</h2>
        <p>
          Reach us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-coral">
            {CONTACT_EMAIL}
          </a>{" "}
          about anything in this policy or to request your data be deleted.
        </p>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import TrustList from "@/components/home/TrustList";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "Why Bluewater Bay & Niceville pet owners choose The Turd Nerdz — locally owned, photo proof every visit, no contracts, and kennel-grade tool sanitizing included.",
  alternates: { canonical: "/why-us" },
};

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Us"
        title="What Makes The Turd Nerdz Different"
        subtitle="Not a franchise, not a call center — just a real local crew that shows up, does it right, and proves it."
      >
        <CTAButton href="/quote" variant="secondary">
          Get Instant Quote →
        </CTAButton>
      </PageHero>

      <TrustList />
    </>
  );
}

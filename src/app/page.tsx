import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import HowItWorks from "@/components/home/HowItWorks";
import EmbeddedQuote from "@/components/home/EmbeddedQuote";
import VideoSection from "@/components/home/VideoSection";
import IntroVideoOverlay from "@/components/home/IntroVideoOverlay";
import ServicesPreview from "@/components/home/ServicesPreview";
import PhotoGallery from "@/components/home/PhotoGallery";
import AwardsSection from "@/components/home/AwardsSection";
import Personas from "@/components/home/Personas";
import Reviews from "@/components/home/Reviews";
import ServiceAreaCallout from "@/components/home/ServiceAreaCallout";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Dog Poop Pickup in Bluewater Bay & Niceville, FL",
  description:
    "The Turd Nerdz removes pet waste weekly in Bluewater Bay & Niceville, FL. No contracts, photo proof every visit, first cleanup free. Get an instant quote.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <IntroVideoOverlay />
      <AwardsSection />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <EmbeddedQuote />
      <VideoSection />
      <ServicesPreview />
      <PhotoGallery />
      <Personas />
      <Reviews />
      <ServiceAreaCallout />
      <FinalCTA />
    </>
  );
}

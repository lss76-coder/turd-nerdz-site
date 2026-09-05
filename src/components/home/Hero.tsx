import HeroFeatureCarousel from "./HeroFeatureCarousel";
import ZipQuoteForm from "./ZipQuoteForm";
import { Sticker, PawScatter } from "@/components/Decor";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-coral/10 blur-3xl"
      />
      <PawScatter className="text-teal" />

      <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-10 text-center sm:pt-16">
        <Sticker tone="green" rotate={-3} className="mb-2 animate-wiggle text-xl sm:text-2xl">
          🎉 First Cleanup FREE
        </Sticker>
        <p className="mb-4 text-sm font-bold uppercase tracking-wide text-coral">
          With any new recurring plan
        </p>

        <h1 className="font-heading text-5xl font-extrabold leading-[0.95] text-logo-green sm:text-6xl lg:text-7xl">
          The Turd
          <br />
          Nerdz
        </h1>
        <p className="mt-3 font-heading text-lg font-bold text-charcoal/70">
          #1 dog waste removal service
        </p>
        <p className="mt-1 font-heading text-2xl font-extrabold text-coral sm:text-3xl">
          No Contracts Required.
        </p>

        <p className="mx-auto mt-5 max-w-md text-lg text-charcoal/80">
          Sign up for recurring poop pickup in Bluewater Bay &amp; Niceville.
          Pick how often we come — we&apos;ll handle the rest.
        </p>

        <div className="mx-auto mt-7 max-w-md">
          <ZipQuoteForm />
          <p className="mt-2 text-sm text-charcoal/50">
            Enter your ZIP and see your price in 30 seconds.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-md">
          <HeroFeatureCarousel />
        </div>
      </div>
    </section>
  );
}

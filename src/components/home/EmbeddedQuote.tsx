import QuoteFlow from "@/app/quote/QuoteFlow";

export default function EmbeddedQuote() {
  return (
    <section id="instant-quote" className="scroll-mt-20 bg-white/60 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-green-dark">
            Try It Right Now
          </span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-teal sm:text-4xl">
            Get Your Price — No Page Reload Needed
          </h2>
          <p className="mt-2 text-charcoal/70">
            Same calculator as our full quote page, right here on the
            homepage. A few taps and you&apos;ve got a real number.
          </p>
        </div>

        <div className="mt-8">
          <QuoteFlow />
        </div>
      </div>
    </section>
  );
}

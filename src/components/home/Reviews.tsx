import { StarRow } from "@/components/icons";

const REVIEWS = [
  {
    quote:
      "Our yard hasn't been this clean since we got the dog. Kai and the team text a photo of the gate after every visit so we always know it's latched — such a nice touch.",
    name: "Sarah M.",
    detail: "Bluewater Bay, FL",
    rotate: "-rotate-1",
  },
  {
    quote:
      "No contract, easy to schedule, and they're genuinely friendly. Exactly what I wanted from a scooping service.",
    name: "Mike T.",
    detail: "Niceville, FL",
    rotate: "rotate-1",
  },
  {
    quote:
      "Signed up for the first-cleanup-free offer and just... never cancelled. Worth every penny. Kai even remembered our dog's name on visit two.",
    name: "The Alvarez Family",
    detail: "Bluewater Bay, FL",
    rotate: "-rotate-1",
  },
];

export default function Reviews() {
  return (
    <section className="bg-teal/5 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-extrabold text-teal sm:text-4xl">
            What Neighbors Are Saying
          </h2>
          <p className="mt-2 text-sm text-charcoal/50">
            (Placeholder reviews shown — swap in real ones as they roll in.)
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[220px_1fr]">
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-teal p-6 text-center text-cream shadow-lg">
            <span className="font-heading text-4xl font-extrabold">5.0</span>
            <StarRow className="justify-center" />
            <span className="text-sm font-semibold text-cream/90">
              Trusted Across
              <br />
              Bluewater Bay &amp; Niceville
            </span>
          </div>

          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible">
            {REVIEWS.map((r, i) => (
              <figure
                key={i}
                className={`w-[85%] shrink-0 snap-center rounded-lg border-2 border-teal/10 bg-white p-6 shadow-md transition-transform hover:rotate-0 sm:w-auto ${r.rotate}`}
              >
                <StarRow />
                <blockquote className="mt-3 text-sm text-charcoal/80">“{r.quote}”</blockquote>
                <figcaption className="mt-4 font-heading text-sm font-bold text-teal">
                  {r.name}
                  <span className="ml-2 font-body text-xs font-normal text-charcoal/50">
                    {r.detail}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

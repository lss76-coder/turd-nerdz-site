import ScrollReveal from "@/components/ScrollReveal";

const PERSONAS = [
  {
    tag: "meetings, not backyard patrol",
    title: "The Busy Professional",
    desc: "You've got a calendar full of meetings, not backyard patrol. We've got it.",
    rotate: "-rotate-2",
  },
  {
    tag: "hands already full",
    title: "The New Parent",
    desc: "Your hands are already full — literally. Let us handle the other mess.",
    rotate: "rotate-2",
  },
  {
    tag: "bad knees, worse smell",
    title: "The Savvy Senior",
    desc: "Bending over 50 times a week isn't retirement. We'll take that chore off your list.",
    rotate: "-rotate-1",
  },
  {
    tag: "anything else, honestly",
    title: "“I'd Rather Do Literally Anything Else”",
    desc: "No judgment. We genuinely enjoy this. Weird, but lucky for you.",
    rotate: "rotate-1",
  },
];

export default function Personas() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-extrabold text-teal sm:text-4xl">
          Who This Is For
        </h2>
        <p className="mt-2 text-charcoal/70">Basically, anyone with a dog and better things to do.</p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {PERSONAS.map((p, i) => (
          <ScrollReveal key={p.title} direction="scale" delay={i * 80}>
            <div
              className={`relative rounded-lg border-2 border-teal/10 bg-white p-6 pt-8 shadow-md transition-transform hover:rotate-0 ${p.rotate}`}
            >
              <span
                className="absolute -top-3 left-6 rounded bg-coral px-3 py-1 font-hand text-base font-bold text-white shadow"
                style={{ transform: "rotate(-4deg)" }}
              >
                {p.tag}
              </span>
              <h3 className="font-heading text-lg font-bold text-teal">{p.title}</h3>
              <p className="mt-1.5 text-sm text-charcoal/70">{p.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

import CTAButton from "@/components/CTAButton";
import ScrollReveal from "@/components/ScrollReveal";
import { IconArrowSquiggle } from "@/components/icons";

const STEPS = [
  { num: "1", title: "Get Quote", desc: "Answer 3 quick questions, get your price instantly." },
  { num: "2", title: "Sign Up", desc: "Pick your schedule and tell us where the gate is." },
  { num: "3", title: "We Scoop", desc: "Our nerds show up, scoop every visit, snap a photo." },
  { num: "4", title: "Enjoy Your Yard", desc: "Walk out barefoot. We've got the rest covered." },
];

const ROTATIONS = ["-rotate-1", "rotate-1", "-rotate-1", "rotate-1"];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:py-14">
      <ScrollReveal>
        <div className="text-center">
          <h2 className="font-heading text-3xl font-extrabold text-teal sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-2 text-charcoal/70">Four steps between you and a poop-free lawn.</p>
        </div>
      </ScrollReveal>

      <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <ScrollReveal key={step.num} direction="up" delay={i * 100}>
            <div className="relative">
              <div
                className={`rounded-2xl border-2 border-teal/10 bg-white p-6 text-center shadow-sm transition-transform hover:rotate-0 ${ROTATIONS[i]}`}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-coral font-heading text-xl font-extrabold text-white">
                  {step.num}
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-teal">{step.title}</h3>
                <p className="mt-1.5 text-sm text-charcoal/70">{step.desc}</p>
              </div>

              {i < STEPS.length - 1 && (
                <IconArrowSquiggle className="absolute -right-8 top-1/2 hidden h-6 w-16 -translate-y-1/2 text-coral/50 lg:block" />
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <CTAButton href="/quote" size="lg">
          Get Instant Quote →
        </CTAButton>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import Accordion from "@/components/Accordion";
import ReferForm from "./ReferForm";
import { Sticker } from "@/components/Decor";

export const metadata: Metadata = {
  title: "Refer a Friend",
  description:
    "Give $20, Get $20. Refer a friend to The Turd Nerdz in Bluewater Bay or Niceville, FL and you both save on pet waste removal service.",
  alternates: { canonical: "/refer-a-friend" },
};

const STEPS = [
  {
    num: "1",
    title: "Send The Referral",
    desc: "Fill out the form below with your friend's name and contact info — takes about 20 seconds.",
  },
  {
    num: "2",
    title: "We Reach Out",
    desc: "We'll text or email your friend a quote and their $20-off code for their first month.",
  },
  {
    num: "3",
    title: "They Sign Up",
    desc: "Once they complete their first cleanup, the referral is confirmed — no extra steps for you.",
  },
  {
    num: "4",
    title: "You Both Get $20",
    desc: "Your friend saves $20 on month one, and you get a $20 credit toward your own service.",
  },
];

const REFERRAL_FAQ = [
  {
    question: "Is there a limit to how many friends I can refer?",
    answer:
      "No limit. Refer five neighbors and you could cover a big chunk of your monthly bill with credits — some of our customers have.",
  },
  {
    question: "When exactly do I get my $20 credit?",
    answer:
      "As soon as your friend's first cleanup is completed and their recurring plan is active, we apply your $20 credit automatically to your account.",
  },
  {
    question: "Does my friend have to live in Bluewater Bay or Niceville?",
    answer:
      "They need to be in our current service area to sign up right away — but feel free to refer anyone. If they're just outside our zone, we'll keep their info on file and reach out the moment we expand to their street.",
  },
  {
    question: "Can I refer myself a second address, like a rental property?",
    answer:
      "The referral program is meant for friends, family, and neighbors — but if you've got a second property, contact us directly and we'll get you set up with the same great rate.",
  },
];

export default function ReferAFriendPage() {
  return (
    <>
      <PageHero
        eyebrow="Refer A Friend"
        title="Give $20, Get $20"
        subtitle="The easiest $20 you'll ever make is telling a neighbor to stop scooping their own yard."
      />

      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
        <div className="text-center">
          <Sticker tone="coral" rotate={-2}>
            It really is this simple
          </Sticker>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="rounded-2xl border-2 border-teal/10 bg-white p-6 text-center"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-teal font-heading text-lg font-extrabold text-cream">
                {s.num}
              </div>
              <h3 className="mt-3 font-heading text-base font-bold text-teal">{s.title}</h3>
              <p className="mt-1.5 text-sm text-charcoal/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/60 py-14 sm:py-16">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-center font-heading text-2xl font-bold text-teal sm:text-3xl">
            Refer Someone Right Now
          </h2>
          <p className="mt-2 text-center text-charcoal/70">
            We&apos;ll open a pre-filled email to send us the details — you send
            it, we handle the rest.
          </p>
          <div className="mt-8 rounded-3xl border-2 border-teal/10 bg-cream p-6 sm:p-8">
            <ReferForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:py-16">
        <h2 className="mb-6 text-center font-heading text-2xl font-bold text-teal sm:text-3xl">
          Referral Program FAQ
        </h2>
        <Accordion items={REFERRAL_FAQ} />

        <div className="mt-10 text-center">
          <CTAButton href="/quote" size="lg">
            Not Referred Yet? Get Your Own Quote →
          </CTAButton>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import { IconBolt, IconCamera, IconHandshake, IconHome } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Turd Nerdz is a locally run pet waste removal service based in Bluewater Bay, FL — started by a local teen entrepreneur who got tired of stepping in it.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    Icon: IconHome,
    title: "Local, Not Corporate",
    desc: "We live in the neighborhoods we serve. No call center, no regional manager — just people who actually walk these streets.",
  },
  {
    Icon: IconCamera,
    title: "Show, Don't Just Tell",
    desc: "A photo after every visit means you never have to take our word for it. Accountability is the whole business model.",
  },
  {
    Icon: IconHandshake,
    title: "Earn It Every Time",
    desc: "No contracts means we can't coast. If we're not doing a great job, you can leave — so we make sure you never want to.",
  },
  {
    Icon: IconBolt,
    title: "Fast & Genuinely Nice",
    desc: "Quick quotes, quick signups, quick responses. And we'll actually be friendly about it, every time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A Local Kid, A Lawn Full Of Problems, And A Really Good Idea"
        subtitle="The Turd Nerdz started three streets over from where you're probably reading this."
      >
        <CTAButton href="/quote" variant="secondary">
          Get Your Instant Quote →
        </CTAButton>
      </PageHero>

      <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 sm:py-16 lg:grid-cols-[1fr_280px]">
        <div className="prose-none space-y-5 text-charcoal/85">
          <h2 className="font-heading text-2xl font-bold text-teal">
            How It Actually Started
          </h2>
          <p>
            The Turd Nerdz isn&apos;t a franchise, and it isn&apos;t backed by
            a private equity firm that decided pet waste was the next hot
            vertical. It started the way most useful businesses do — with a
            genuinely annoying, unsolved problem in a specific neighborhood:
            our own, right here in Bluewater Bay.
          </p>
          <p>
            Between mowing lawns and walking neighbors&apos; dogs for extra
            cash, one thing kept coming up: nobody actually likes scooping
            poop, but everybody wants a yard they can walk across barefoot.
            The handful of national pet-waste companies that technically
            &quot;served&quot; this area treated it like an afterthought —
            inconsistent schedules, no photos, no way to reach an actual
            person when something went wrong.
          </p>
          <p>
            So The Turd Nerdz got built the old-fashioned way: a bag of
            scooping tools, a bike, a spreadsheet, and a lot of knocking on
            doors around Bluewater Bay and Niceville. What&apos;s changed
            since then is the website, the routing, and the number of yards —
            what hasn&apos;t changed is that the person who shows up to scoop
            your yard is the same person who answers the phone when you call.
          </p>
          <h2 className="font-heading text-2xl font-bold text-teal">
            Why &quot;No Turd Left Behind&quot;?
          </h2>
          <p>
            It&apos;s a nod to my dad, who served in the Air Force — where
            leaving nobody and nothing behind isn&apos;t a slogan, it&apos;s
            just how the job gets done. We hold ourselves to that same
            standard here: a rushed, half-done job isn&apos;t actually
            cheaper — it just means you&apos;re back out there with a bag
            five minutes after we leave. Every visit gets walked
            methodically, corner to corner, and gets a photo to prove it.
            That&apos;s the whole promise, and it&apos;s the reason for the
            tagline.
          </p>
        </div>

        <div className="mx-auto flex flex-col items-center gap-4 rounded-2xl border-2 border-teal/10 bg-white p-6 text-center lg:sticky lg:top-24">
          <Image
            src="/brand/logo-v2-512.png"
            alt="The Turd Nerdz logo — No Turd Left Behind"
            width={200}
            height={200}
            className="h-40 w-40"
          />
          <h3 className="font-heading text-lg font-bold text-teal">
            No Turd Left Behind
          </h3>
          <p className="text-sm text-charcoal/70">
            Yes, our mascot is a pile of poop wearing glasses and a pocket
            protector. We figured if we&apos;re going to be in this
            business, we might as well be honest — and a little funny —
            about it. He&apos;s precise, he&apos;s a little nerdy, and he
            never misses a spot.
          </p>
        </div>
      </section>

      <section className="bg-white/60 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center font-heading text-3xl font-extrabold text-teal">
            What We Actually Believe
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="flex gap-4 rounded-2xl border-2 border-teal/10 bg-cream p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <v.Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-teal">{v.title}</h3>
                  <p className="mt-1 text-sm text-charcoal/70">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:py-16">
        <h2 className="font-heading text-2xl font-bold text-teal sm:text-3xl">
          Want To Be Part Of The Next Chapter?
        </h2>
        <p className="mt-3 text-charcoal/75">
          Every new customer helps this stay a real local business instead of
          turning into one of the faceless companies we started this to
          replace. Sign up, tell a neighbor, or just say hi if you see us on
          your street.
        </p>
        <CTAButton href="/quote" size="lg" className="mt-6">
          Get Your Instant Quote →
        </CTAButton>
      </section>
    </>
  );
}

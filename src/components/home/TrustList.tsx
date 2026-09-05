import {
  IconBolt,
  IconCamera,
  IconGift,
  IconHandshake,
  IconHome,
  IconSanitize,
} from "@/components/icons";
import ScrollReveal from "@/components/ScrollReveal";
import { DEODORIZER_MONTHLY } from "@/lib/config";

const ITEMS = [
  {
    Icon: IconHome,
    title: "Locally Owned & Operated",
    desc: "The Turd Nerdz is run right here in Bluewater Bay — not a franchise. You'll always get a real person, not a call center.",
  },
  {
    Icon: IconCamera,
    title: "Photo Proof Every Visit",
    desc: "We text a photo of your gate latched shut after every visit, so you always know your dog and yard were left safe and secure.",
  },
  {
    Icon: IconHandshake,
    title: "No Contracts, No Hidden Fees",
    desc: "Pause, skip, or cancel any time. We earn your business every visit, not through fine print.",
  },
  {
    Icon: IconBolt,
    title: "Sign Up in Minutes",
    desc: "No phone tag, no complicated forms — get a quote and get scheduled in one quick visit to our site.",
  },
  {
    Icon: IconSanitize,
    title: "Kennel-Grade Tool Sanitizing",
    desc: "We disinfect our tools and shoes with kennel-grade sanitizer after every single yard — included on every visit, no exceptions, no extra charge.",
  },
  {
    Icon: IconGift,
    title: "Referral Rewards",
    desc: "Give $20, get $20 every time you send a neighbor our way.",
  },
];

export default function TrustList() {
  return (
    <section className="bg-white/60 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-extrabold text-teal sm:text-4xl">
            Why The Turd Nerdz
          </h2>
          <p className="mt-2 text-charcoal/70">
            We nerded out on this so your yard doesn&apos;t have to be gross.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {ITEMS.map((item, i) => (
            <ScrollReveal key={item.title} direction="left" delay={i * 60}>
              <div className="flex flex-col items-center gap-5 sm:flex-row">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-green/30 bg-green/10 text-green-dark">
                  <item.Icon className="h-8 w-8" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-teal">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-charcoal/70">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
